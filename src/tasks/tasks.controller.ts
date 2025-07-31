import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto';

@Controller('tasks')
export class TasksController {
  @Post() create(@Body() _dto: CreateTaskDto) {
    this.notImpl();
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
