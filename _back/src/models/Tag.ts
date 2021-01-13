import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import { dbType } from '.';

class Tag extends Model {
  public readonly id!: number;

  public name!: string;
}

Tag.init(
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tag',
    tableName: 'tag',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Tag.belongsToMany(db.Post, { through: 'PostTag' });
};

export default Tag;
