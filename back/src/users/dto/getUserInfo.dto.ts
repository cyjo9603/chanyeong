import { Field, Int, ObjectType } from '@nestjs/graphql';

import { CoreResponse } from '@common/dtos/coreResponse.dto';

@ObjectType()
class UserInfo {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String)
  familyName!: string;

  @Field((type) => String)
  givenName!: string;
}

@ObjectType()
export class GetUserInfoResponse extends CoreResponse {
  @Field((type) => UserInfo, { nullable: true })
  user?: UserInfo;
}
