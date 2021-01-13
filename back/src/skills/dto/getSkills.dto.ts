import { ObjectType, InputType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dtos/coreResponse.dto';
import { Skill, SkillType } from '../skills.model';

@InputType('InputSkillType')
export class GetSkillsRequest {
  @Field((type) => SkillType)
  type!: SkillType;
}

@ObjectType()
export class GetSkillsResponse extends CoreResponse {
  @Field((type) => [Skill], { nullable: true })
  skills?: Skill[];
}
