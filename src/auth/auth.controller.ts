import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.usersService.create(body.email, body.password);
      return user;
    } catch (error) {
      throw new HttpException('User registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }
}
