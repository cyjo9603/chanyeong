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

import Skill from './Skill';

enum ProjectType {
  PERSONAL = 'PERSONAL',
  GROUP = 'GROUP',
}

@Entity()
class Project extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'enum', enum: ProjectType })
  type!: ProjectType;

  @Column({ type: 'varchar', length: 30 })
  groupName!: string;

  @Column({ type: 'varchar', length: 50 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'date' })
  endDate?: string;

  @Column({ type: 'varchar', nullable: true })
  githubAddr?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  titleImage?: string;

  @Column({ type: 'int' })
  contribution!: number;

  @Column({ type: 'boolean', default: false })
  picked?: boolean;

  @CreateDateColumn() createdAt!: string;

  @UpdateDateColumn() updatedAt!: string;

  @ManyToMany(() => Skill)
  @JoinTable({ name: 'project_skill' })
  skills!: Skill[];
}

export default Project;
