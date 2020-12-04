import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import { UserLevel } from '../types/api';

class User extends Model {
  public readonly id!: number;

  public level!: UserLevel;

  public userId!: string;

  public password!: string;

  public familyName!: string;

  public givenName!: string;

  public refreshToken?: string;
}

User.init(
  {
    level: {
      type: DataTypes.ENUM('ADMIN'),
      allowNull: false,
      defaultValue: 'ADMIN',
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    familyName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    givenName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(400),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default User;
