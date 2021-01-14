import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { SignupRequest } from './dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getByUserId(userId: string) {
    const user = await this.userModel.findOne({ where: { userId }, attributes: ['id'] });
    return user;
  }

  async create(input: SignupRequest) {
    try {
      await this.userModel.create(input);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
