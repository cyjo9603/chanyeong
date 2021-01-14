import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dtos/coreResponse.dto';
import { UsersService } from './users.service';
import { SignupRequest } from './dto/signup.dto';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => CoreResponse)
  async signup(@Args('input') input: SignupRequest): Promise<CoreResponse> {
    console.log(input);
    const { ok, error } = await this.usersService.create(input);
    return { ok, error };
  }
}
