import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto, LoginDto, SignupDto } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard, Role } from '../common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Signup',
    description: 'Register a new user account.',
  })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto.email, dto.password, Role.USER);
  }

  @Post('create-admin')
  @ApiOperation({
    summary: 'Create Admin',
    description: 'Register a new admin account.',
  })
  async createAdmin(@Body() dto: CreateAdminDto) {
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
