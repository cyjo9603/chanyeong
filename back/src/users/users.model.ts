import { Column, Model, Table, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { ObjectType, Field, registerEnumType, Int, InputType } from '@nestjs/graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jwtConstants } from '@auth/constants';

const BCRYPT_SALT = 10 as const;

export enum UserLevel {
  ADMIN = 'ADMIN',
}

registerEnumType(UserLevel, { name: 'UserLevel' });

@InputType('InputUser', { isAbstract: true })
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
  @Column({ type: DataType.STRING(20), unique: true })
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

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (!instance.password) return;
    instance.password = await bcrypt.hash(instance.password, BCRYPT_SALT);
  }

  async comparePassword(aPassword: string) {
    const isCompare = await bcrypt.compare(aPassword, this.password);
    return isCompare;
  }

  verifyRefresh() {
    if (!this.refreshToken) return false;
    const result = jwt.verify(this.refreshToken, jwtConstants.secret);

    return Boolean(result);
  }
}
