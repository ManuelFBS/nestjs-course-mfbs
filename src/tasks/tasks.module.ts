import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
