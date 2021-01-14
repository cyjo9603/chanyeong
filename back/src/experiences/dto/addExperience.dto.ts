import { InputType, PickType } from '@nestjs/graphql';
import { Experience } from '../experiences.model';

@InputType('InputAddExperience')
export class AddExperienceRequest extends PickType(Experience, [
  'title',
  'content',
  'startDate',
  'endDate',
]) {}
