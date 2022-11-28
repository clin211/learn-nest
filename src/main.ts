import { NestFactory } from '@nestjs/core';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import 'winston-daily-rotate-file';

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warning',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  });
  await app.listen(3000);
}
bootstrap();
