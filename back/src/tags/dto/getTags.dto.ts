import { ObjectType, Field, Int } from '@nestjs/graphql';

import { CoreResponse } from '@/common/dto/coreResponse.dto';
import { Tag } from '../tags.model';

@ObjectType()
export class TagWithCount extends Tag {
  @Field((type) => Int)
  count!: number;
}

@ObjectType()
export class GetTagsResponse extends CoreResponse {
  @Field((type) => [TagWithCount], { nullable: true })
  tags?: TagWithCount[];
}
