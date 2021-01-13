import { ObjectType, InputType, Field, Int } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dtos/coreResponse.dto';
import { Project } from '../projects.model';

@InputType('InputProjectType')
export class GetProjectRequest {
  @Field(() => Int)
  id!: number;
}

@ObjectType()
export class GetProjectResponse extends CoreResponse {
  @Field((type) => Project, { nullable: true })
  project?: Project;
}
