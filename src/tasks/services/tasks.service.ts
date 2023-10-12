import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
  ) {}

  public async createTask(body: any, projectId: number): Promise<TasksEntity> {
    return await this.taskRepository.save(body);
  }
}
