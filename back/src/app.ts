import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import { buildContext } from 'graphql-passport';

import schema from '@/schema';
import passportInit from '@auth/passport';

const GRAPHQL_ENDPOINT = '/graphql' as const;
const prod = process.env.NODE_ENV === 'production';

class App {
  public app: Express;

  private server: ApolloServer;

  constructor() {
    this.app = express();
    this.server = new ApolloServer({
      schema,
      context: ({ req, res }) => buildContext({ req, res }),
      playground: !prod,
    });
    this.middlewares();
  }

  private middlewares = () => {
    if (prod) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(
        cors({
          origin: /chanyeong\.com$/,
          credentials: true,
        }),
      );
    } else {
      this.app.use(logger('dev'));
      this.app.use(
        cors({
          origin: true,
          credentials: true,
        }),
      );
    }
    this.app.use(cookieParser());
    passportInit();
    this.app.use(compression());
    this.server.applyMiddleware({ app: this.app, path: GRAPHQL_ENDPOINT });
  };
}

export default new App().app;
