import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { TagsService } from '@tags/tags.service';
import { Tag, TagWithMethod } from '@tags/tags.model';
import { FixRequest } from '@common/dto/inputFix.dto';
import { Post, PostWithMethod } from './posts.model';
import { GetPostsRequest } from './dto/getPosts.dto';
import { SearchPostRequest } from './dto/searchPost.dto';
import { WritePostRequest } from './dto/writePost.dto';
import { EditPostRequest } from './dto/editPost.dto';

const LIMIT_POST = 10;

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    private tagsService: TagsService,
  ) {}

  getFindWhere({ lastId, category }: GetPostsRequest) {
    const lastIdWhere = lastId && { id: { [Op.lt]: lastId } };
    const categoryWhere = category && { category };

    return { lastIdWhere, categoryWhere };
  }

  async getById(id: number) {
    try {
      const post = await this.postModel.findOne({ where: { id }, include: [{ model: Tag }] });
      return { post };
    } catch (error) {
      return { error };
    }
  }

  async getPostsByTag(input: GetPostsRequest) {
    try {
      const { lastIdWhere, categoryWhere } = this.getFindWhere(input);

      const { tag } = (await this.tagsService.getById(input.tagId!)) as { tag: TagWithMethod };
      const posts = await tag.getPosts({
        where: { ...lastIdWhere, ...categoryWhere },
        order: [['id', 'DESC']],
        include: [{ model: Tag }],
        limit: LIMIT_POST,
      });

      return { posts };
    } catch (error) {
      return { error };
    }
  }

  async getPosts(input: GetPostsRequest) {
    try {
      const { lastIdWhere, categoryWhere } = this.getFindWhere(input);

      const posts = await this.postModel.findAll({
        where: { ...lastIdWhere, ...categoryWhere },
        order: [['id', 'DESC']],
        include: [{ model: Tag }],
        limit: LIMIT_POST,
      });

      return { posts };
    } catch (error) {
      return { error };
    }
  }

  async getPickeds() {
    try {
      const posts = await this.postModel.findAll({
        where: { [Op.not]: { picked: null } },
        include: [{ model: Tag }],
        order: [['picked', 'DESC']],
      });

      return { posts };
    } catch (error) {
      return { error };
    }
  }

  async getPostsBySearch({ searchWord, lastId }: SearchPostRequest) {
    try {
      const lastIdWhere = lastId && { id: { [Op.lt]: lastId } };
      const posts = await this.postModel.findAll({
        where: { title: { [Op.like]: `%${searchWord}%` }, ...lastIdWhere },
        limit: LIMIT_POST,
        include: [{ model: Tag }],
        order: [['id', 'DESC']],
      });
      return { posts };
    } catch (error) {
      return { error };
    }
  }

  async add({ tags, ...addInfo }: WritePostRequest) {
    try {
      const post = (await this.postModel.create(addInfo)) as PostWithMethod;
      if (tags) {
        const { createdTags } = await this.tagsService.addTags(tags);
        if (createdTags) await post.addTags(createdTags);
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async update({ id, deleteTags, addTags, ...updateInfo }: EditPostRequest) {
    try {
      const post = (await this.postModel.findOne({ where: { id } })) as PostWithMethod;
      if (!post) throw new Error('no post');
      await post.update(updateInfo);
      if (deleteTags) await post.removeTags(deleteTags);
      if (addTags) {
        const { createdTags } = await this.tagsService.addTags(addTags);
        if (createdTags) await post.addTags(createdTags);
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async delete(id: number) {
    try {
      const post = (await this.postModel.findOne({
        where: { id },
        include: [{ model: Tag }],
      })) as PostWithMethod;
      await post.removeTags(post.tags?.map(({ id: tagId }) => tagId) || []);
      await post.destroy();
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async fix({ id, fix }: FixRequest) {
    try {
      await this.postModel.update({ picked: fix ? Date.now() : null }, { where: { id } });
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
