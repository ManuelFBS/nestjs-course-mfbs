import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('register')
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @Get(':id')
  public async findProjectById(@Param('id') id: number) {
    return await this.projectService.findProjectById(id);
  }

  @Put('edit/:id')
  public async updateProject(
    @Body() body: ProjectUpdateDTO,
    @Param('id') id: number,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete('delete/:id')
  public async deleteProject(@Param('id') id: number) {
    return await this.projectService.deleteProject(id);
  }
}
