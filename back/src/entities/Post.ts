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
import { PostCategory } from '../types/graph';

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'enum', enum: ['DIARY', 'DEV'] })
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
