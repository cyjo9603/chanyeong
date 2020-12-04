import { ApolloServer } from 'apollo-server-express';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import hpp from 'hpp';

import schema from '@/schema';
import { decryptValue } from '@utils/crypto';
import passportInit from '@auth/passport';

const GRAPHQL_ENDPOINT = '/graphql' as const;
const prod = process.env.NODE_ENV === 'production';

const JWT_HEADER = process.env.JWT_HEADER as string;

class App {
  public app: Express;

  private server: ApolloServer;

  constructor() {
    this.app = express();
    this.server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
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
    this.app.use(this.jwt);
    passportInit();
    this.app.use(compression());
    this.server.applyMiddleware({ app: this.app, path: GRAPHQL_ENDPOINT });
  };

  private jwt = async (req: Request, _: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
      const cookie = req.cookies[JWT_HEADER];
      const decryptToken = decryptValue(cookie);
      req.headers.authorization = cookie && `Bearer ${decryptToken}`;
    }
    next();
  };
}

export default new App().app;
