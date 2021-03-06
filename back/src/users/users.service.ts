import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { SignupRequest } from './dto/signup.dto';
import { EditUserInfoRequest } from './dto/editUserInfo.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getByUserId(userId: string) {
    const user = await this.userModel.findOne({
      where: { userId },
      attributes: ['id', 'password'],
    });
    return user;
  }

  async getById(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: ['refreshToken', 'id', 'familyName', 'givenName'],
    });
    return user;
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    await this.userModel.update({ refreshToken }, { where: { id } });
  }

  async create(input: SignupRequest) {
    try {
      await this.userModel.create(input);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async update({ id, ...updateInfo }: EditUserInfoRequest) {
    try {
      const user = await this.userModel.findOne({ where: { id } });
      await user?.update(updateInfo);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
