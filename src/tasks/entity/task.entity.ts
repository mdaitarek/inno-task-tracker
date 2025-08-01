import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';
import { Role } from '../../common';

class UserSummary {
  @ApiProperty({ description: 'User ID', example: '60d21b4667d0d8992e610c84' })
  _id: string;

  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({ description: 'User role', enum: Role, example: Role.USER })
  role: Role;
}

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

  @ApiProperty({
    description: 'User who created the task',
    type: () => UserSummary,
  })
  createdBy: UserSummary;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T12:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-02T12:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}
