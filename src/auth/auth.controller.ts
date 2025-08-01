import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAdminDto, LoginDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard, Role } from '../common';
import { UserEntity } from './entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Signup',
    description: 'Register a new user account.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  @ApiResponse({ status: 409, description: 'Email already taken.' })
  async signup(@Body() dto: SignupDto): Promise<UserEntity> {
    return this.authService.signup(dto.email, dto.password, Role.USER);
  }

  @Post('create-admin')
  @ApiOperation({
    summary: 'Create Admin',
    description: 'Register a new admin account.',
  })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created.',
    type: UserEntity,
  })
  @ApiResponse({ status: 409, description: 'Email already taken.' })
  async createAdmin(@Body() dto: CreateAdminDto): Promise<UserEntity> {
    return this.authService.signup(dto.email, dto.password, Role.ADMIN);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'User/Admin Login',
    description: 'Authenticate user and get access token.',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
