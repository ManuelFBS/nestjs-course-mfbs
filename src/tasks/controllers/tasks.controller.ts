import { Body, Controller, Param, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksDTO } from '../dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksRepository: TasksService) {}

  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: number,
  ) {
    return await this.tasksRepository.createTask(body, projectId);
  }
}
