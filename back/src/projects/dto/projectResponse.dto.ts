import { ObjectType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { Project } from '../projects.model';

@ObjectType()
export class ProjectsResponse extends CoreResponse {
  @Field((type) => [Project], { nullable: true })
  projects?: Project[];
}
