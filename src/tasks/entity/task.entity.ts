import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';

export class TaskEntity {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: '60d21b4667d0d8992e610c85',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Write documentation',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description for the task',
    example: 'Complete the API documentation for all endpoints',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Due date for the task',
    example: '2025-08-01T17:00:00.000Z',
    type: Date,
  })
  dueDate?: Date;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  status: TaskStatus;

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }
}
