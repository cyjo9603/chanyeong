import User, { associate as associateUser } from './User';
import Project, { associate as associateProject } from './Project';
import Post, { associate as associatePost } from './Post';
import Skill, { associate as associateSkill } from './Skill';
import Tag, { associate as associateTag } from './Tag';
import Experience from './Experience';

export * from './sequelize';

const db = {
  User,
  Project,
  Post,
  Skill,
  Tag,
  Experience,
};

export type dbType = typeof db;

associateUser(db);
associateProject(db);
associatePost(db);
associateSkill(db);
associateTag(db);
