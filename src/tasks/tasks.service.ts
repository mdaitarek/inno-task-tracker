import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskStatus } from 'src/tasks/schemas/task.schema';
import { CreateTaskDto } from 'src/tasks/dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {
  }

  async create(_dto: CreateTaskDto) {
    const {
      title,
      description,
      dueDate,
      status,
    } = _dto;
    return await this.taskModel.create({
      title,
      description: description ?? '',
      dueDate: dueDate ?? null,
      status: status ?? TaskStatus.OPEN,
    });
  }

}
