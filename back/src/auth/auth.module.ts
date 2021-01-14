import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '@users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { ExpriedJwtStrategy, JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({ secret: jwtConstants.secret })],
  providers: [AuthService, LocalStrategy, JwtStrategy, ExpriedJwtStrategy, AuthResolver],
})
export class AuthModule {}
