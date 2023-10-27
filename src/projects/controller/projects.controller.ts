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
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ACCESS_LEVEL } from '../../constants/roles';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@ApiTags('Projects')
@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @ApiParam({
    name: 'userId',
  })
  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async createProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: number,
  ) {
    return await this.projectService.createProject(body, userId);
  }

  @PublicAccess()
  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @ApiParam({
    name: 'projectId',
  })
  @PublicAccess()
  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: number) {
    return await this.projectService.findProjectById(id);
  }

  @Get('list/api')
  @PublicAccess()
  public async listApi() {
    return await this.projectService.listApi();
  }

  @ApiParam({
    name: 'projectId',
  })
  @AccessLevel(ACCESS_LEVEL.OWNER)
  @Put('edit/:projectId')
  public async updateProject(
    @Body() body: ProjectUpdateDTO,
    @Param('projectId') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @ApiParam({
    name: 'projectId',
  })
  @AccessLevel(ACCESS_LEVEL.OWNER)
  @Delete('delete/:projectId')
  public async deleteProject(@Param('projectId') id: number) {
    return await this.projectService.deleteProject(id);
  }
}
