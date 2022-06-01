import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  AppModule,
  updateEnvs,
  enableCors,
  enableDocs,
} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  updateEnvs();
  enableCors(app);
  enableDocs(app);

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();

  await app.listen(app.get(ConfigService).get<number>('PORT'));
}
bootstrap();
