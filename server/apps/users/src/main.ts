import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_MICROSERVICE_HOST || '0.0.0.0',
        port: Number(process.env.USERS_SERVICE_PORT),
      },
    },
  );

  await app.listen();
  console.log(`Microservice is listening on: ${process.env.USERS_SERVICE_PORT}`);
}
bootstrap();
