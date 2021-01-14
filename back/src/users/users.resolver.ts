import { Resolver, Mutation, Args, Directive, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { DeactivateGuard } from '@auth/guards/deactivated.guard';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { User, TokenUser } from '@decorators/user.decorator';
import { createJWT } from '@utils/createJwt';
import { encryptValue } from '@utils/crypto';
import { UsersService } from './users.service';
import { SignupRequest } from './dto/signup.dto';
import { SigninRequest, SigninResponse } from './dto/signin.dto';

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation((returns) => SigninResponse)
  async signin(
    @Args('input') _: SigninRequest,
    @User() user: TokenUser,
    @Context() { res }: { res: Response },
  ) {
    const { refreshToken, accessToken } = createJWT(user.id);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    res.cookie(process.env.JWT_HEADER!, encryptValue(accessToken), {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return { ok: true };
  }

  /** @deprecated */
  @UseGuards(DeactivateGuard)
  @Directive('@deprecated(reason: "deactivated graphql request")')
  @Mutation((returns) => CoreResponse)
  async signup(@Args('input') input: SignupRequest): Promise<CoreResponse> {
    const { ok, error } = await this.usersService.create(input);
    return { ok, error };
  }
}
