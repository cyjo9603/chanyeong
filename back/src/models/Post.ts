import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import { PostCategory } from '../types/graph';

class Post extends Model {
  public readonly id!: number;

  public category!: PostCategory;

  public title!: string;

  public content!: string;

  public titleImage?: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Post.init(
  {
    category: {
      type: DataTypes.ENUM('DIARY', 'DEV'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    titleImage: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true,
  },
);

export const associate = (db: dbType) => {
  db.Post.belongsToMany(db.Tag, { through: 'PostTag' });
};

export default Post;
