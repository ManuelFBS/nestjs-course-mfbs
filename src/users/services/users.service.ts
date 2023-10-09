import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      const lastUser: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .orderBy('user.id', 'DESC')
        .getOne();

      let initialId = 1001;

      if (lastUser) {
        initialId = lastUser.id + 1;
      }

      const newUser = new UsersEntity();
      // const HS: number = process.env.HASH_SALT; ========>> No acepta la variable de entorno...???
      const newUserPassword = await bcrypt.hash(body.password, 10);

      newUser.id = initialId;
      newUser.firstName = body.firstName;
      newUser.lastName = body.lastName;
      newUser.age = body.age;
      newUser.email = body.email;
      newUser.username = body.username;
      newUser.password = newUserPassword;
      newUser.role = body.role;

      const user = await this.userRepository.save(newUser);

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado...!',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: number): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningún resultado',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(
    body: UserToProjectDTO,
  ): Promise<UsersProjectsEntity> {
    try {
      const lastUserProject: UsersProjectsEntity =
        await this.userProjectRepository
          .createQueryBuilder('userproject')
          .orderBy('userproject.id', 'DESC')
          .getOne();

      let initialId = 1001;

      if (lastUserProject) {
        initialId = lastUserProject.id + 1;
      }

      const newUserProject = new UsersProjectsEntity();

      newUserProject.id = initialId;
      newUserProject.user = body.user;
      newUserProject.project = body.project;
      newUserProject.accessLevel = body.accessLevel;

      const userProject = await this.userProjectRepository.save(newUserProject);

      return userProject;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: number,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar...!',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: number): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar...!',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
