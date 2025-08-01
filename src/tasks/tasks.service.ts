import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto, GetTasksDto, UpdateTaskStatusDto } from '../tasks/dto';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(_dto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description, dueDate, status } = _dto;
    const task = await this.taskModel.create({
      title,
      description: description ?? '',
      dueDate: dueDate ?? null,
      ...(status && { status }),
    });

    return new TaskEntity({
      id: (task._id as Types.ObjectId).toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
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

    const tasks = await this.taskModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const data = tasks.map(
      (task) =>
        new TaskEntity({
          id: (task._id as Types.ObjectId).toString(),
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          status: task.status,
        }),
    );

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

  async updateStatus(
    id: string,
    updateDto: UpdateTaskStatusDto,
  ): Promise<TaskEntity> {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { status: updateDto.status },
      { new: true },
    );

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return new TaskEntity({
      id: (task._id as Types.ObjectId).toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });
  }
}
