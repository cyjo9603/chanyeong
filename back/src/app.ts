import { ApolloServer } from 'apollo-server-express';
import express, { Express, RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import hpp from 'hpp';

import schema from './schema';
import { ACCESS_TOKEN } from './utils/createJWT';
import decodeJWT from './utils/decodeJWT';

const GRAPHQL_ENDPOINT = '/graphql' as const;
const prod = process.env.NODE_ENV === 'production';

class App {
  public app: Express;

  private server: ApolloServer;

  constructor() {
    this.app = express();
    this.server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
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
    this.app.use(compression());
    this.app.use(this.jwt);
    this.server.applyMiddleware({ app: this.app, path: GRAPHQL_ENDPOINT });
  };

  private jwt: RequestHandler = async (req: any, res, next) => {
    const token = req.get('X-JWT');
    if (token) {
      const user = await decodeJWT(ACCESS_TOKEN, token);
      req.user = user;
    }
    next();
  };
}

export default new App().app;
