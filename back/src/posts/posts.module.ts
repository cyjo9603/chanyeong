import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { Post } from './posts.model';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
