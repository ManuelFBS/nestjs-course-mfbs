import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { ACCESS_LEVEL } from '../../constants/roles';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async createUser(@Body() body: UserDTO) {
    return await this.userService.createUser(body);
  }

  // @Roles('ADMIN')
  @AdminAccess()
  @Get('all')
  public async findAllUsers() {
    return await this.userService.findUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @PublicAccess()
  @Get(':id')
  public async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @AccessLevel(ACCESS_LEVEL.OWNER)
  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDTO, projectId: number) {
    return await this.userService.relationToProject(body);
  }

  @ApiParam({
    name: 'id',
  })
  @Put('edit/:id')
  public async updateUser(
    @Body() body: UserUpdateDTO,
    @Param('id') id: number,
  ) {
    return await this.userService.updateUser(body, id);
  }

  @ApiParam({
    name: 'id',
  })
  @AdminAccess()
  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: number) {
    return await this.userService.deleteUser(id);
  }
}
