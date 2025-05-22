import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const parseOrigins = (originStr?: string): string[] =>
  originStr
    ? originStr
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      ...parseOrigins(process.env.FRONTEND_ORIGINS),
      ...parseOrigins(process.env.ADMINSITE_ORIGINS),
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');

  await app.listen(Number(process.env.PORT) ?? 3000);
}
bootstrap();
