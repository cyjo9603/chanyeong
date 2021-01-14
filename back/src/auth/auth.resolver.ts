import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { User, TokenUser } from '@decorators/user.decorator';
import { AuthService } from './auth.service';
import { SigninRequest, SigninResponse } from './dto/signin.dto';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => SigninResponse)
  async signin(
    @Args('input') _: SigninRequest,
    @User() user: TokenUser,
    @Context() { res }: { res: Response },
  ) {
    const accessToken = await this.authService.signin({ id: user.id });
    res.cookie(process.env.JWT_HEADER!, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true };
  }
}
