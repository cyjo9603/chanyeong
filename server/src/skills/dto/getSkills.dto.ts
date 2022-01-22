import { ObjectType, InputType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { Skill, SkillType } from '../skills.model';

@InputType('InputGetSkills')
export class GetSkillsRequest {
  @Field((type) => SkillType)
  type!: SkillType;
}

@ObjectType()
export class GetSkillsResponse extends CoreResponse {
  @Field((type) => [Skill], { nullable: true })
  skills?: Skill[];
}
