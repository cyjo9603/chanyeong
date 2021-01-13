import { ObjectType, Field } from '@nestjs/graphql';

import { CoreResponse } from '@common/dtos/coreResponse.dto';
import { Post } from '../posts.model';

@ObjectType()
export class GetPickedPostsResponse extends CoreResponse {
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}
