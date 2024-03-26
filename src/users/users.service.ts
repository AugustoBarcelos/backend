import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<any>) {}

  async create(email: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      passwordHash: hashedPassword,
    });
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email }).exec();
  }
}