import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { Experience } from '@experiences/experiences.model';
import { Post } from '@posts/posts.model';
import { User } from '@users/users.model';

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
      models: [Experience, Post, User],
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
  ],
})
export class AppModule {}
