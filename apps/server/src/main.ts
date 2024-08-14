/* eslint-disable dot-notation */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use('/api/stripe/webhook', express.raw({ type: '*/*' }));
  app.use('/api/replicate-webhook', express.json({ type: 'application/json' }));

  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(
    process.env['PORT'] ? parseInt(process.env['PORT'], 10) : 4000,
  );
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
