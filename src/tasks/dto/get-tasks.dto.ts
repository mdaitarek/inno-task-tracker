import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';
import { IsEnum, IsISO8601, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class GetTasksDto {
  @ApiPropertyOptional({
    description: 'Filter tasks by status',
    enum: TaskStatus,
    example: TaskStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Filter tasks with due date from this date (ISO 8601 date string)',
    example: '2025-07-01',
  })
  @IsOptional()
  @IsISO8601()
  dueFrom?: string;

  @ApiPropertyOptional({
    description: 'Filter tasks with due date until this date (ISO 8601 date string)',
    example: '2025-07-31',
  })
  @IsOptional()
  @IsISO8601()
  dueTo?: string;

  @ApiPropertyOptional({
    description: 'Search tasks by title (case-insensitive partial match)',
    example: 'documentation',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value) || 1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    minimum: 1,
    example: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value) || 10)
  limit?: number = 10;
}