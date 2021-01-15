import { InputType, PartialType, IntersectionType, PickType } from '@nestjs/graphql';

import { Skill } from '../skills.model';

@InputType('InputUpdateSkill')
export class UpdateSkillRequest extends IntersectionType(
  PickType(PartialType(Skill), ['name', 'type', 'level', 'description', 'icon', 'order']),
  PickType(Skill, ['id']),
) {}
