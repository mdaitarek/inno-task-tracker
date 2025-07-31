import { TaskStatus } from '../schemas/task.schema';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}