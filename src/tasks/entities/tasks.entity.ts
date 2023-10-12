import { Column, Entity, ManyToOne } from 'typeorm';
import { STATUS_TASK } from '../../constants/status-task';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
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

  @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
  project: ProjectsEntity;
}
