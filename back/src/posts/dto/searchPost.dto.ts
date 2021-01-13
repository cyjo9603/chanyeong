import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputSearchPosts')
export class SearchPostRequest {
  @Field((type) => String)
  searchWord!: string;

  @Field((type) => Int, { nullable: true })
  lastId?: number;
}
