import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controller/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from '../users/entities/usersProjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
