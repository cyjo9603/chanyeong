import { Resolver, Query, Args } from '@nestjs/graphql';

import { PostsService } from './posts.service';
import { GetPostRequest, GetPostResponse } from './dto/getPost.dto';
import { GetPostsRequest } from './dto/getPosts.dto';
import { PostsResponse } from './dto/postsResponse.dto';
import { SearchPostRequest } from './dto/searchPost.dto';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => GetPostResponse)
  async getPost(@Args('input') input: GetPostRequest): Promise<GetPostResponse> {
    const { post, error } = await this.postsService.getById(input.id);

    if (!post || error) return { ok: false, error };

    return { ok: true, post };
  }

  @Query((returns) => PostsResponse)
  async getPosts(@Args('input') input: GetPostsRequest): Promise<PostsResponse> {
    const { posts, error } = input.tagId
      ? await this.postsService.getPostsByTag(input)
      : await this.postsService.getPosts(input);

    if (!posts || error) return { ok: false, error };

    return { ok: true, posts };
  }

  @Query((returns) => PostsResponse)
  async getPickedPosts() {
    const { posts, error } = await this.postsService.getPickeds();

    if (!posts || error) return { ok: false, error };

    return { ok: true, posts };
  }

  @Query((returns) => PostsResponse)
  async searchPosts(@Args('input') input: SearchPostRequest) {
    const { posts, error } = await this.postsService.getPostsBySearch(input);

    if (!posts || error) return { ok: false, error };

    return { ok: true, posts };
  }
}
