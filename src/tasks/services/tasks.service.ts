import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { ProjectsService } from '../../projects/services/projects.service';
import { TasksDTO } from '../dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    private readonly projectService: ProjectsService,
  ) {}

  public async createTask(
    body: TasksDTO,
    projectId: number,
  ): Promise<TasksEntity> {
    const project = await this.projectService.findProjectById(projectId);
    return await this.taskRepository.save({
      ...body,
      project,
    });
  }
}
