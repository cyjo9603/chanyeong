import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import logger from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import { AppModule } from '@/app.module';

const prod = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 4000;

const WINDOW_MS = 60 * 1000;
const MAX_REQUEST_PER_15 = 80;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(logger('combined'));
    app.use(rateLimit({ windowMs: WINDOW_MS, max: MAX_REQUEST_PER_15 }));
  } else {
    app.use(logger('dev'));
  }

  app.use(cookieParser());
  app.use(compression());

  await app.listen(PORT);
}

bootstrap();
