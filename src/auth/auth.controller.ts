import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      return { success: false, message: 'User not found' };
    }


    if (user.passwordHash !== body.password) {
      return { success: false, message: 'Incorrect password' };
    }

    return { success: true, message: 'Logged in successfully' };
  }
}