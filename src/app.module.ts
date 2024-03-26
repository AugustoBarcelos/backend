import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as cors from 'cors'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Confirm the location of your .env file
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { // Ensure MONGODB_URI is correctly defined in your .env
      connectionFactory: (connection) => {
        connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
        return connection;
      },
    }),
    OrdersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('MongoDB URI:', process.env.MONGODB_URI);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
