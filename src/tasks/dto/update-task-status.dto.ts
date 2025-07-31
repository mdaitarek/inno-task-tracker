import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../schemas/task.schema';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'New status for the task',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}