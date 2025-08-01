import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common';

export class UserEntity {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '60d21b4667d0d8992e610c85',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: Role,
    example: Role.USER,
  })
  role: Role;

  @ApiProperty({
    description: 'Status of the user',
    example: true,
  })
  status: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
