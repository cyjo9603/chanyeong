import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Tag from './Tag';

enum PostCategory {
  DIARY = 'DIARY',
  DEV = 'DEV',
}

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'enum', enum: PostCategory })
  category!: PostCategory;

  @Column({ type: 'varchar', length: 50 })
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  titleImage?: string;

  @CreateDateColumn() createdAt!: string;

  @UpdateDateColumn() updatedAt!: string;

  @ManyToMany(() => Tag)
  @JoinTable({ name: 'post_tag' })
  tags!: Tag[];
}

export default Post;
