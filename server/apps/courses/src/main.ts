import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { coursessGrcpClient } from './grcpCourses-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(coursessGrcpClient);
  app.enableShutdownHooks();
  //await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
