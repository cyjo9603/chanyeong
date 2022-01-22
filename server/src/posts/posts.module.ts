import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagsModule } from '@/tags/tags.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post } from './posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Post]), TagsModule],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
