import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Write documentation',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description for the task',
    example: 'Complete the API documentation for all endpoints',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Description should not be empty if provided' })
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Due date for the task (ISO 8601 date string)',
    example: '2025-08-01T17:00:00.000Z',
    type: Date,
    format: 'date-time',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Due date should not be empty if provided' })
  @IsDate({ message: 'Due date must be a valid Date instance' })
  @Type(() => Date)
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be a valid TaskStatus value' })
  status?: TaskStatus;
}
