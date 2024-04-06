// src/app.module.ts or src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // generated ethereal user
          pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`, // outgoing email ID
      },
    }),
    // other modules
  ],
  // controllers and providers
})
export class AppModule {}
