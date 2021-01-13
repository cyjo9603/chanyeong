import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';

export enum SkillType {
  FRONT_END = 'FRONT_END',
  BACK_END = 'BACK_END',
  DEV_OPS = 'DEV_OPS',
}

registerEnumType(SkillType, { name: 'SkillType' });

@ObjectType()
@Table({
  tableName: 'skill',
  modelName: 'Skill',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
export class Skill extends Model<Skill> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => SkillType)
  @Column({ type: DataType.ENUM('FRONT_END', 'BACK_END', 'DEV_OPS') })
  type!: SkillType;

  @Field((type) => String)
  @Column({ type: DataType.STRING(30) })
  name!: string;

  @Field((type) => Int)
  @Column({ type: DataType.INTEGER })
  level!: number;

  @Field((type) => String)
  @Column({ type: DataType.TEXT })
  description!: string;

  @Field((type) => String)
  @Column({ type: DataType.STRING(200) })
  icon!: string;

  @Field((type) => Int)
  @Column({ type: DataType.INTEGER })
  order!: number;
}
