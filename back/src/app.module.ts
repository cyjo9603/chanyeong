import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

const prod = process.env.NODE_ENV === 'production';

@Module({
  imports: [
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
