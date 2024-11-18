
import { NestFactory } from '@nestjs/core';

import 'reflect-metadata';

import { AppModule } from './app.module';
import { identityGrcpClient } from './identityGrcp-client.js';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, identityGrcpClient);

  await app.listen();
  console.log(`🟢 identity service listening at **** on HOST 🟢\n`);
}

bootstrap();;
