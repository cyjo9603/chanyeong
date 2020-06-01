import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: 'varchar', length: 20 })
  name!: string;
}

export default Tag;
