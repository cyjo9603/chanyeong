import { User } from '@/users/users.model';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { encryptValue } from '@utils/crypto';
import { TokenUser } from '@decorators/user.decorator';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(userId: string, password: string): Promise<TokenUser | null> {
    const user = await this.userService.getByUserId(userId);
    const isCompared = await user?.comparePassword(password);

    if (!isCompared || !user) return null;

    return { id: user.id };
  }

  async signin(payload: TokenUser) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '14d' });

    await this.userService.updateRefreshToken(payload.id, refreshToken);

    return encryptValue(accessToken);
  }

  async verifyRefresh(id: number) {
    const user = await this.userService.getById(id);

    if (!user) return false;
    return user.verifyRefresh();
  }
}
