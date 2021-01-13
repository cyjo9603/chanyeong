import { Resolver, Query, Args } from '@nestjs/graphql';
import { GetPostRequest, GetPostResponse } from './dtos/getPost.dto';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => GetPostResponse)
  async getPost(@Args('input') input: GetPostRequest): Promise<GetPostResponse> {
    const { post, error } = await this.postsService.getById(input.id);

    if (!post || error) {
      return { ok: false, error };
    }
    return { ok: true, post };
  }
}
