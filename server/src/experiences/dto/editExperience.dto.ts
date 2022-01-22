import { InputType, PartialType, IntersectionType, PickType } from '@nestjs/graphql';

import { Experience } from '../experiences.model';

@InputType('InputEditExperience')
export class EditExperienceRequest extends IntersectionType(
  PickType(PartialType(Experience), ['startDate', 'endDate', 'title', 'content']),
  PickType(Experience, ['id']),
) {}
