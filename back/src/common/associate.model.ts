import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

import { Post } from '@posts/posts.model';
import { Tag } from '@tags/tags.model';

import { Project } from '@projects/projects.model';
import { Skill } from '@skills/skills.model';

@Table
export class PostTag extends Model {
  @ForeignKey(() => Post)
  @Column
  postId!: number;

  @ForeignKey(() => Tag)
  @Column
  tagId!: number;
}

@Table
export class ProjectSkill extends Model {
  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @ForeignKey(() => Skill)
  @Column
  skillId!: number;
}
