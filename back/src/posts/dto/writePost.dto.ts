import { InputType, PickType, Field } from '@nestjs/graphql';
import { Post } from '../posts.model';

@InputType('InputWritePost')
export class WritePostRequest extends PickType(Post, [
  'category',
  'title',
  'content',
  'titleImage',
]) {
  @Field((type) => [String])
  tags?: string[];
}
