import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { PostTag } from '@common/associate.model';
import { Post } from '@posts/posts.model';

@ObjectType()
@Table({
  tableName: 'tag',
  modelName: 'Tag',
})
export class Tag extends Model<Tag> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => String)
  @Column({ type: DataType.STRING(20) })
  name!: string;

  @BelongsToMany(
    () => Post,
    () => PostTag,
  )
  posts?: Post[];
}

export interface TagWithMethod extends Tag {
  getPosts: (...args: any) => Promise<Post[]>;
}
