import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CoreResponse {
  @Field((type) => Boolean)
  ok!: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;
}
