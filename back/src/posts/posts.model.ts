import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';

import { Tag } from '@tags/tags.model';
import { PostTag } from '@common/associate.model';

export enum PostCategory {
  DIARY,
  DEV,
}

registerEnumType(PostCategory, { name: 'PostCategory' });

@ObjectType()
@Table({
  tableName: 'post',
  modelName: 'Post',
  timestamps: true,
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
export class Post extends Model<Post> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => PostCategory)
  @Column({ type: DataType.ENUM('DIARY', 'DEV') })
  category!: PostCategory;

  @Field((type) => String)
  @Column({ type: DataType.STRING(50) })
  title!: string;

  @Field((type) => String)
  @Column({ type: DataType.TEXT })
  content!: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: DataType.STRING(200), allowNull: true })
  titleImage?: string;

  @Field((type) => Date, { nullable: true })
  @Column({ type: DataType.DATE, allowNull: true })
  picked?: Date;

  @Field((type) => Date)
  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @Field((type) => Date)
  @Column({ type: DataType.DATE })
  updatedAt!: Date;

  @Field((type) => [Tag], { nullable: true })
  @BelongsToMany(
    () => Tag,
    () => PostTag,
  )
  tags?: Tag[];
}
