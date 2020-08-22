import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import { ProjectType } from '../types/graph';

class Project extends Model {
  public readonly id!: number;

  public type!: ProjectType;

  public groupName?: string;

  public title!: string;

  public description!: string;

  public content!: string;

  public startDate!: string;

  public endDate?: string;

  public githubAddr?: string;

  public titleImage?: string;

  public contribution?: number;

  public picked?: Date;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Project.init(
  {
    type: {
      type: DataTypes.ENUM('PERSONAL', 'GROUP'),
      allowNull: false,
    },
    groupName: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    githubAddr: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    titleImage: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    contribution: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    picked: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'project',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true,
  },
);

export const associate = (db: dbType) => {
  db.Project.belongsToMany(db.Skill, { through: 'ProjectSkill' });
};

export default Project;
