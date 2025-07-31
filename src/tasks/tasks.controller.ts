import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  create(@Body() _dto: CreateTaskDto) {
    console.log({ _dto });
    return this.tasksService.create(_dto);
  }

  @Get() list(@Query() _q: any) {
    this.notImpl();
  }

  @Patch(':id/status') update(@Param('id') _id: string, @Body() _dto: any) {
    this.notImpl();
  }

  private notImpl() {
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
