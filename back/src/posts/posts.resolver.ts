import { Resolver, Query, Args } from '@nestjs/graphql';

import { PostsService } from './posts.service';
import { GetPostRequest, GetPostResponse } from './dto/getPost.dto';
import { GetPostsRequest, GetPostsResponse } from './dto/getPosts.dto';

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

  @Query((returns) => GetPostsResponse)
  async getPosts(@Args('input') input: GetPostsRequest): Promise<GetPostsResponse> {
    const { posts, error } = input.tagId
      ? await this.postsService.getPostsByTag(input)
      : await this.postsService.getPosts(input);

    if (!posts || error) {
      return { ok: false, error };
    }

    return { ok: true, posts };
  }
}
