import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputFix')
export class FixRequest {
  @Field((type) => Int)
  id!: number;

  @Field((type) => Boolean)
  fix!: boolean;
}
