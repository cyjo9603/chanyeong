import { Resolver, Mutation, Query, Args, Directive } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { DeactivateGuard } from '@auth/guards/deactivated.guard';
import { User, TokenUser } from '@decorators/user.decorator';
import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { UsersService } from './users.service';
import { SignupRequest } from './dto/signup.dto';
import { GetUserInfoResponse } from './dto/getUserInfo.dto';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Query((returns) => GetUserInfoResponse)
  async getUserInfo(@User() _user: TokenUser): Promise<GetUserInfoResponse> {
    const user = await this.usersService.getById(_user.id);

    if (!user) return { ok: false };

    return { ok: true, user };
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
