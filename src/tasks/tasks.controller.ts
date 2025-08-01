import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, GetTasksDto, UpdateTaskStatusDto } from './dto';
import { TasksService } from './tasks.service';
import { TaskEntity, TasksPaginatedEntity } from './entity';
import { Task } from './schemas/task.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: TaskEntity })
  @Post()
  async create(@Body() _dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(_dto);
  }

  @ApiOperation({ summary: 'List tasks with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Return tasks with pagination metadata',
    type: TasksPaginatedEntity,
  })
  @Get()
  async list(@Query() query: GetTasksDto): Promise<TasksPaginatedEntity> {
    return await this.tasksService.list(query);
  }
  
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'The task status has been successfully updated.', type: TaskEntity })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Patch(':id/status')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto): Promise<Task> {
    return await this.tasksService.updateStatus(id, dto);
  }
}
