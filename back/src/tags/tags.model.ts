import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Table({
  tableName: 'tag',
  modelName: 'Tag',
})
export class Tag extends Model<Tag> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => String)
  @Column({ type: DataType.STRING(20) })
  name!: string;
}
