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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('create')
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':projectId')
  public async findProjectById(@Param('projectId') id: number) {
    return await this.projectService.findProjectById(id);
  }

  @AccessLevel(50)
  @Put('edit/:projectId')
  public async updateProject(
    @Body() body: ProjectUpdateDTO,
    @Param('projectId') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @AccessLevel(50)
  @Delete('delete/:projectId')
  public async deleteProject(@Param('projectId') id: number) {
    return await this.projectService.deleteProject(id);
  }
}
