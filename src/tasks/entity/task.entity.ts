import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';

export class TaskEntity {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: '60d21b4667d0d8992e610c85',
  })
  _id: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Write documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Optional description for the task',
    example: 'Complete the API documentation for all endpoints',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Due date for the task',
    example: '2025-08-01T17:00:00.000Z',
    required: false,
    type: Date,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-02T12:00:00.000Z',
  })
  updatedAt: Date;
}
