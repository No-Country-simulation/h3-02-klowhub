import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.select(AppModule).get(LoggerService);
  logger.setApplication('collab-zone');
  app.useLogger(logger);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
