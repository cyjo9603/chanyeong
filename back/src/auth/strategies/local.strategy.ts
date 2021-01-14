import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userId',
      passwordField: 'password',
    });
  }

  async validate(userId: string, password: string) {
    const user = this.authService.validateUser(userId, password);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
