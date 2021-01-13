import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Table({
  tableName: 'experience',
  modelName: 'Experience',
  charset: 'utf8mb4',
  collate: 'utf8mb4_general_ci',
})
export class Experience extends Model<Experience> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => String)
  @Column({ type: DataType.STRING(50) })
  title!: string;

  @Field((type) => String)
  @Column({ type: DataType.TEXT })
  content!: string;

  @Field((type) => String)
  @Column({ type: DataType.DATEONLY })
  startDate!: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: DataType.DATEONLY, allowNull: true })
  endDate?: string;
}
