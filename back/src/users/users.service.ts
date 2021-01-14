import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { SignupRequest } from './dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(input: SignupRequest) {
    try {
      await this.userModel.create(input);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
