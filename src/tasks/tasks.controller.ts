import { Body, Controller, Get, Param, Patch, Post, Query, HttpException, HttpStatus } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  private notImpl() {
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post() create(@Body() _dto: any) { this.notImpl(); }
  @Get() list(@Query() _q: any) { this.notImpl(); }
  @Patch(':id/status') update(@Param('id') _id: string, @Body() _dto: any) { this.notImpl(); }
}
