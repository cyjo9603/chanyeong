import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { ExperiencesModule } from '@experiences/experiences.module';
import { PostsModule } from '@posts/posts.module';
import { ProjectsModule } from '@projects/projects.module';
import { TagsModule } from '@tags/tags.module';

import { Experience } from '@experiences/experiences.model';
import { Post } from '@posts/posts.model';
import { Project } from '@projects/projects.model';
import { Skill } from '@skills/skills.model';
import { Tag } from '@tags/tags.model';
import { User } from '@users/users.model';
import { PostTag, ProjectSkill } from '@common/associate.model';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Experience, Post, Project, Skill, Tag, User, PostTag, ProjectSkill],
      define: {
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    }),
    GraphQLModule.forRoot({
      playground: !prod,
      autoSchemaFile: true,
      cors: {
        credentials: true,
        origin: prod ? /chanyeong\.com$/ : 'http://localhost:3060',
      },
      context: (ctx) => ({ ...ctx }),
    }),
    ExperiencesModule,
    PostsModule,
    TagsModule,
    ProjectsModule,
  ],
})
export class AppModule {}
