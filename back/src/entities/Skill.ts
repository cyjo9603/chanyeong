import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Skill extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'varchar', length: 30 })
  name!: string;

  @Column({ type: 'int' })
  level!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 200 })
  icon!: string;
}

export default Skill;
