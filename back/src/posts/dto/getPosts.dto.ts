import { InputType, Field, Int } from '@nestjs/graphql';

import { PostCategory } from '../posts.model';

@InputType('InputGetPosts')
export class GetPostsRequest {
  @Field((type) => Int, { nullable: true })
  lastId?: number;

  @Field((type) => Int, { nullable: true })
  tagId?: number;

  @Field((type) => PostCategory, { nullable: true })
  category?: PostCategory;
}
