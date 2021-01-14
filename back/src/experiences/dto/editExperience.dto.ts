import { InputType, Field, Int } from '@nestjs/graphql';

@InputType('InputEditExperience')
export class EditExperienceRequest {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String, { nullable: true })
  startDate?: string;

  @Field((type) => String, { nullable: true })
  endDate?: string;

  @Field((type) => String, { nullable: true })
  title?: string;

  @Field((type) => String, { nullable: true })
  content?: string;
}
