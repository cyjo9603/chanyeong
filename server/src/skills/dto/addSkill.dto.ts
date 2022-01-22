import { InputType, PickType } from '@nestjs/graphql';
import { Skill } from '../skills.model';

@InputType('InputAddSkill')
export class AddSkillRequest extends PickType(Skill, [
  'name',
  'type',
  'level',
  'description',
  'icon',
  'order',
]) {}
