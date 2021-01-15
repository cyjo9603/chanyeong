import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CoreResponse } from '@/common/dtos/coreResponse.dto';
import { PostsService } from './posts.service';
import { GetPostRequest, GetPostResponse } from './dto/getPost.dto';
import { GetPostsRequest } from './dto/getPosts.dto';
import { PostsResponse } from './dto/postsResponse.dto';
import { SearchPostRequest } from './dto/searchPost.dto';
import { WritePostRequest } from './dto/writePost.dto';

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
  async getPickedPosts(): Promise<PostsResponse> {
    const { posts, error } = await this.postsService.getPickeds();

    if (!posts || error) return { ok: false, error };

    return { ok: true, posts };
  }

  @Query((returns) => PostsResponse)
  async searchPosts(@Args('input') input: SearchPostRequest): Promise<PostsResponse> {
    const { posts, error } = await this.postsService.getPostsBySearch(input);

    if (!posts || error) return { ok: false, error };

    return { ok: true, posts };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async writePost(@Args('input') input: WritePostRequest): Promise<CoreResponse> {
    const { ok, error } = await this.postsService.add(input);
    return { ok, error };
  }
}
