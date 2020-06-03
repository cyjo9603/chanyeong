import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SkillType } from '../types/graph';

@Entity()
class Skill extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'varchar', length: 30 })
  name!: string;

  @Column({ type: 'enum', enum: ['FRONT_END', 'BACK_END', 'DEV_OPS'] })
  type!: SkillType;

  @Column({ type: 'int' })
  level!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 200 })
  icon!: string;
}

export default Skill;
