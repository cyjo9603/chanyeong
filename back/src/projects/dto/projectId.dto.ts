import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputProjectId')
export class ProjectIdRequest {
  @Field(() => Int)
  id!: number;
}
