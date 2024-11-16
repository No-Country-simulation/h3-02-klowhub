import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { usersGrcpClient } from './grpcUsers-client';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, usersGrcpClient);

  await app.listen();
  console.log(`Application is running on`);
}

bootstrap();
