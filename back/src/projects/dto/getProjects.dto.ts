import { InputType, Field } from '@nestjs/graphql';

import { ProjectType } from '../projects.model';

@InputType('InputProjectsType')
export class GetProjectsRequest {
  @Field(() => ProjectType)
  type!: ProjectType;
}
