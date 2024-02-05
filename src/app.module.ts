import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService],
})
export class AppModule {}
