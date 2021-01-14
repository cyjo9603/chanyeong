import { InputType, PickType } from '@nestjs/graphql';
import { Skill } from '../skills.model';

@InputType('InputDeleteSkill')
export class DeleteSkillRequest extends PickType(Skill, ['id']) {}
