import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';
import { SkillType } from '../types/graph';

export const enum SKILL_TYPE {
  FRONT_END = 'FRONT_END',
  BACK_END = 'BACK_END',
  DEV_OPS = 'DEV_OPS',
}

class Skill extends Model {
  public readonly id!: number;

  public name!: string;

  public type!: SkillType;

  public level!: number;

  public description!: string;

  public icon!: string;

  public order!: number;
}

Skill.init(
  {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(SKILL_TYPE.FRONT_END, SKILL_TYPE.BACK_END, SKILL_TYPE.DEV_OPS),
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Skill',
    tableName: 'skill',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {
  db.Skill.belongsToMany(db.Project, { through: 'ProjectSkill' });
};

export default Skill;
