import { ObjectType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { Experience } from '../experiences.model';

@ObjectType()
export class GetExperiences extends CoreResponse {
  @Field((type) => [Experience], { nullable: true })
  experiences?: Experience[];
}
