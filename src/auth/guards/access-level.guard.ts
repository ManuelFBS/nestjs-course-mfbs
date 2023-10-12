import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from '../../constants/key-decorators';
import { ROLES } from '../../constants/roles';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const accesLevel = this.reflector.get<number>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();

    const { roleUser, idUser } = req;

    if (accesLevel === undefined) {
      if (roles === undefined) {
        if (!admin) {
          return true;
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          throw new UnauthorizedException(
            'No tienes permisos para realizar esta operación...!',
          );
        }
      }
    }

    if (roleUser === ROLES.ADMIN) return true;

    const user = await this.userService.findUserById(parseInt(idUser));

    const userExistInProject = user.projectsIncludes.find(
      (project) => project.project.id === parseInt(req.params.projectId),
    );

    if (userExistInProject === undefined) {
      throw new UnauthorizedException('No formas parte del projecto...!');
    }

    if (accesLevel !== userExistInProject.accessLevel) {
      throw new UnauthorizedException(
        'No tienes el nivel de acceso neceesario...!',
      );
    }

    return true;
  }
}
