import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controller/projects.controller';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
