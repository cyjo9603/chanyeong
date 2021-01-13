import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';

export enum UserLevel {
  ADMIN,
}

registerEnumType(UserLevel, { name: 'UserLevel' });

@ObjectType()
@Table({ tableName: 'user', modelName: 'User' })
export class User extends Model<User> {
  @Field((type) => Int)
  @Column({ primaryKey: true })
  readonly id!: number;

  @Field((type) => UserLevel)
  @Column({ defaultValue: UserLevel.ADMIN, type: DataType.ENUM('ADMIN') })
  level!: UserLevel;

  @Field((type) => String)
  @Column({ type: DataType.STRING(20) })
  userId!: string;

  @Field((type) => String)
  @Column({ type: DataType.STRING(200) })
  password!: string;

  @Field((type) => String)
  @Column({ type: DataType.STRING(15) })
  familyName!: string;

  @Field((type) => String)
  @Column({ type: DataType.STRING(20) })
  givenName!: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: DataType.STRING(400), allowNull: true })
  refreshToken?: string;
}
