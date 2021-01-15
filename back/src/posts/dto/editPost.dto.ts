import { InputType, PartialType, IntersectionType, PickType, Field, Int } from '@nestjs/graphql';

import { Post } from '../posts.model';

@InputType('InputEditPost')
export class EditPostRequest extends IntersectionType(
  PickType(PartialType(Post), ['category', 'title', 'content', 'titleImage']),
  PickType(Post, ['id']),
) {
  @Field((type) => [Int], { nullable: true })
  deleteTags?: number[];

  @Field((type) => [String], { nullable: true })
  addTags?: string[];
}
