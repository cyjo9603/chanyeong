import { Query, Resolver } from '@nestjs/graphql';

import { TagsService } from './tags.service';
import { GetTagsResponse } from './dto/getTags.dto';

@Resolver()
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query((returns) => GetTagsResponse)
  async getTags(): Promise<GetTagsResponse> {
    const { tags, error } = await this.tagsService.getTagsWithCount();

    if (!tags || error) return { ok: false, error };

    return { ok: true, tags };
  }
}
