import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/tasks/entity/task.entity';
import { Task } from 'src/tasks/schemas/task.schema';

export class TasksPaginatedEntity {
  @ApiProperty({
    description: 'Array of task entities',
    type: [TaskEntity],
  })
  data: Task[];

  @ApiProperty({
    description: 'Pagination metadata',
    example: {
      page: 1,
      limit: 10,
      total: 25,
      totalPages: 3,
    },
  })
  meta: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
  };
}
