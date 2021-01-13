import { ObjectType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dtos/coreResponse.dto';
import { Skill } from '../skills.model';

@ObjectType()
export class GroupedSkills extends CoreResponse {
  @Field((type) => [Skill])
  front!: Skill[];

  @Field((type) => [Skill])
  back!: Skill[];

  @Field((type) => [Skill])
  devops!: Skill[];
}

@ObjectType()
export class GetGroupedSkillsResponse extends CoreResponse {
  @Field((type) => GroupedSkills, { nullable: true })
  skills?: GroupedSkills;
}
