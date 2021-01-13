import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Post } from '@posts/posts.model';
import { Tag } from '@tags/tags.model';

@Table
export class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId!: number;

  @ForeignKey(() => Tag)
  @Column
  tagId!: number;
}
