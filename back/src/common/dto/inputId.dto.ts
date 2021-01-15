import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputId')
export class IdRequest {
  @Field((type) => Int)
  id!: number;
}
