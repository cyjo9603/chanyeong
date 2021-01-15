import { InputType, PartialType, IntersectionType, PickType, Field, Int } from '@nestjs/graphql';
import { Project } from '../projects.model';

@InputType('InputUpdateProject')
export class UpdateProjectRequest extends IntersectionType(
  PickType(PartialType(Project), [
    'groupName',
    'description',
    'content',
    'endDate',
    'githubAddr',
    'titleImage',
    'contribution',
  ]),
  PickType(Project, ['id']),
) {
  @Field((type) => [Int], { nullable: true })
  deleteSkills?: number[];

  @Field((type) => [Int], { nullable: true })
  addSkills?: number[];
}
