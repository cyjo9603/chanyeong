import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { ObjectType, InputType, PickType, Field } from '@nestjs/graphql';

import { User } from '@users/users.model';

@InputType('InputSignin')
export class SigninRequest extends PickType(User, ['userId', 'password']) {}

@ObjectType()
export class SigninResponse extends CoreResponse {
  @Field((type) => String, { nullable: true })
  userName?: string;
}
