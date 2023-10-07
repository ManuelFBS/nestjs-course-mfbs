import { BaseEntity } from 'src/config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (usersProject) => usersProject.project)
  usersIncludes: UsersProjectsEntity[];
}
