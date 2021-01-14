import { Resolver, Mutation, Args, Directive } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeactivateGuard } from '@/auth/guards/deactivated.guard';
import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { UsersService } from './users.service';
import { SignupRequest } from './dto/signup.dto';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  /** @deprecated */
  @UseGuards(DeactivateGuard)
  @Directive('@deprecated(reason: "deactivated graphql request")')
  @Mutation((returns) => CoreResponse)
  async signup(@Args('input') input: SignupRequest): Promise<CoreResponse> {
    const { ok, error } = await this.usersService.create(input);
    return { ok, error };
  }
}
