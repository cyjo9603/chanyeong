import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { Post, PostCategory } from '../posts.model';

@InputType('InputGetPosts')
export class GetPostsRequest {
  @Field((type) => Int, { nullable: true })
  lastId?: number;

  @Field((type) => Int, { nullable: true })
  tagId?: number;

  @Field((type) => PostCategory, { nullable: true })
  category?: PostCategory;
}

@ObjectType()
export class GetPostsResponse extends CoreResponse {
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}
