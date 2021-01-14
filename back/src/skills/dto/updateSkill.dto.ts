import { InputType, Field, Int } from '@nestjs/graphql';
import { SkillType } from '../skills.model';

@InputType('InputUpdateSkill')
export class UpdateSkillRequest {
  @Field((type) => Int)
  id!: number;

  @Field((type) => String, { nullable: true })
  name?: string;

  @Field((type) => SkillType, { nullable: true })
  type?: SkillType;

  @Field((type) => Int, { nullable: true })
  level?: number;

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => String, { nullable: true })
  icon?: string;

  @Field((type) => Int, { nullable: true })
  order?: number;
}
