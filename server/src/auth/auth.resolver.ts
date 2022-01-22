import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { User, TokenUser } from '@decorators/user.decorator';
import { CoreResponse } from '@common/dto/coreResponse.dto';
import { UsersService } from '@users/users.service';
import { User as UserModel } from '@users/users.model';
import { AuthService } from './auth.service';
import { SigninRequest, SigninResponse } from './dto/signin.dto';
import { ExpriedJwtAuthGuard } from './guards/jwt-auth.guard';
import { jwtConstants } from './constants';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => SigninResponse)
  async signin(
    @Args('input') _: SigninRequest,
    @User() user: TokenUser,
    @Context() { res }: { res: Response },
  ): Promise<SigninResponse> {
    const accessToken = await this.authService.signin({ id: user.id });
    const { familyName, givenName } = (await this.userService.getById(user.id)) as UserModel;
    res.cookie(jwtConstants.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true, userName: `${familyName}${givenName}` };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async refresh(
    @User() user: TokenUser,
    @Context() { res }: { res: Response },
  ): Promise<CoreResponse> {
    if (!user) return { ok: false };
    const isVerifiedToken = await this.authService.verifyRefresh(user.id);

    if (!isVerifiedToken) return { ok: false, error: 'expried refresh token' };

    const accessToken = await this.authService.signin({ id: user.id });
    res.cookie(jwtConstants.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true };
  }

  @UseGuards(ExpriedJwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async logout(
    @User() user: TokenUser,
    @Context() { res }: { res: Response },
  ): Promise<CoreResponse> {
    await this.userService.updateRefreshToken(user.id, null);

    res.clearCookie(jwtConstants.header);

    return { ok: true };
  }
}
