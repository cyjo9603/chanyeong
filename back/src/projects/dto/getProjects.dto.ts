import { InputType, Field } from '@nestjs/graphql';

import { ProjectType } from '../projects.model';

@InputType('InputProjectType')
export class GetProjectRequest {
  @Field(() => ProjectType)
  type!: ProjectType;
}
