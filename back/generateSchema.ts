import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { printSchema } from 'graphql';
import fs from 'fs';

import { Experience } from '@experiences/experiences.model';
import { Post } from '@posts/posts.model';
import { Project } from '@projects/projects.model';
import { Skill } from '@skills/skills.model';
import { Tag } from '@tags/tags.model';
import { User } from '@users/users.model';
import { PostTag, ProjectSkill } from '@common/associate.model';

import { AuthResolver } from '@auth/auth.resolver';
import { ExperiencesResolver } from '@experiences/experiences.resolver';
import { PostsResolver } from '@posts/posts.resolver';
import { ProjectsResolver } from '@projects/projects.resolver';
import { TagsResolver } from '@tags/tags.resolver';
import { SkillsResolver } from '@skills/skills.resolver';
import { UsersResolver } from '@users/users.resolver';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      models: [Experience, Post, Project, Skill, Tag, User, PostTag, ProjectSkill],
    }),
  ],
})
class GenerateWithSequelizeModule extends GraphQLSchemaBuilderModule {}

async function generateSchema() {
  const app = await NestFactory.create(GenerateWithSequelizeModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);

  const schema = await gqlSchemaFactory.create([
    AuthResolver,
    ExperiencesResolver,
    PostsResolver,
    ProjectsResolver,
    TagsResolver,
    SkillsResolver,
    UsersResolver,
  ]);

  fs.writeFileSync('schema.graphql', printSchema(schema));
}

generateSchema();
