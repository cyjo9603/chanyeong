import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { Post } from '../posts.model';

@InputType('InputPostId')
export class GetPostRequest {
  @Field((type) => Int)
  id!: number;
}

@ObjectType()
export class GetPostResponse extends CoreResponse {
  @Field((type) => Post, { nullable: true })
  post?: Post;
}
