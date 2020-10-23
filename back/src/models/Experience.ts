import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

class Experience extends Model {
  public readonly id!: number;

  public startDate!: Date;

  public endDate?: Date;

  public title!: string;

  public content!: string;
}

Experience.init(
  {
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
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
  },
  {
    sequelize,
    modelName: 'Experience',
    tableName: 'experience',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
);

export default Experience;
