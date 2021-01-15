import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputPostId')
export class PostIdRequest {
  @Field((type) => Int)
  id!: number;
}
