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
        host: process.env.USERS_MICROSERVICE_HOST || '0.0.0.0', // Puedes usar una variable de entorno
        port: parseInt(process.env.USERS_SERVICE_PORT, 10) || 3001, // También puedes definir el puerto en .env
      },
    },
  );

  await app.listen();
  console.log('Microservice is listening...');
}
bootstrap();
