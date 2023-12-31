import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksDTO } from '../dto/tasks.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksRepository: TasksService) {}

  @ApiParam({
    name: 'projectId',
  })
  @AccessLevel(ACCESS_LEVEL.DEVELOPER)
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: number,
  ) {
    return await this.tasksRepository.createTask(body, projectId);
  }
}
