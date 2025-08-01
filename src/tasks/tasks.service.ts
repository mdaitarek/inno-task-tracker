import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto, GetTasksDto, UpdateTaskStatusDto } from '../tasks/dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(_dto: CreateTaskDto, user: User) {
    const { title, description, dueDate, status } = _dto;
    return await this.taskModel.create({
      title,
      description: description ?? '',
      dueDate: dueDate ?? null,
      ...(status && { status }),
      createdBy: user,
    });
  }

  async list(query: GetTasksDto) {
    const { status, dueFrom, dueTo, search, page = 1, limit = 10 } = query;

    const filter: any = {
      ...(status && { status }),
      ...((dueFrom || dueTo) && {
        dueDate: {
          ...(dueFrom && { $gte: new Date(dueFrom) }),
          ...(dueTo && { $lte: new Date(dueTo) }),
        },
      }),
      ...(search && { title: { $regex: search, $options: 'i' } }),
    };
    const skip = (page - 1) * limit;

    const data = await this.taskModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async updateStatus(id: string, updateDto: UpdateTaskStatusDto) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { status: updateDto.status },
      { new: true },
    );

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return task;
  }
}
