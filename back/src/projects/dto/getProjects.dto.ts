import { InputType, Field } from '@nestjs/graphql';

import { ProjectType } from '../projects.model';

@InputType('InputGetProjects')
export class GetProjectsRequest {
  @Field(() => ProjectType)
  type!: ProjectType;
}
