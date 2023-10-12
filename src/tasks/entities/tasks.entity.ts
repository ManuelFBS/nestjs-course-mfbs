import { Column, Entity } from 'typeorm';
import { STATUS_TASK } from 'src/constants/status-task';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'task' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;

  @Column()
  responsableName: string;

  project: ProjectsEntity;
}
