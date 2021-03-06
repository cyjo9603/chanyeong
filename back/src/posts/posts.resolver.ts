import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CoreResponse } from '@common/dto/coreResponse.dto';
import { FixRequest } from '@common/dto/inputFix.dto';
import { IdRequest } from '@common/dto/inputId.dto';
import { PostsService } from './posts.service';
import { GetPostResponse } from './dto/getPost.dto';
import { GetPostsRequest } from './dto/getPosts.dto';
import { PostsResponse } from './dto/postsResponse.dto';
import { SearchPostRequest } from './dto/searchPost.dto';
import { WritePostRequest } from './dto/writePost.dto';
import { EditPostRequest } from './dto/editPost.dto';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query((returns) => GetPostResponse)
  async getPost(@Args('input') input: IdRequest): Promise<GetPostResponse> {
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

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async editPost(@Args('input') input: EditPostRequest): Promise<CoreResponse> {
    const { ok, error } = await this.postsService.update(input);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async deletePost(@Args('input') input: IdRequest): Promise<CoreResponse> {
    const { ok, error } = await this.postsService.delete(input.id);
    return { ok, error };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => CoreResponse)
  async fixPost(@Args('input') input: FixRequest): Promise<CoreResponse> {
    const { ok, error } = await this.postsService.fix(input);
    return { ok, error };
  }
}
