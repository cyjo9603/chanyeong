import { InputType, PickType, Field, Int } from '@nestjs/graphql';

import { Project } from '../projects.model';

@InputType('InputAddProject')
export class AddProjectRequest extends PickType(Project, [
  'type',
  'groupName',
  'title',
  'content',
  'description',
  'startDate',
  'endDate',
  'githubAddr',
  'titleImage',
  'contribution',
]) {
  @Field((type) => [Int], { nullable: true })
  skillIds?: number[];
}
