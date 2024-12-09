import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

dotenv.config();

console.log({ MICRO_HOST: process.env.USERS_MICROSERVICE_HOST});
console.log({ MICRO_PORT: process.env.USERS_MICROSERVICE_PORT });
console.log({ PG_URL: process.env.POSTGRES_URL});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_MICROSERVICE_HOST,
        port: Number(process.env.USERS_MICROSERVICE_PORT),
        
      },
    },
  );
  await app.listen();
  console.log(`Microservice Users is listening on: ${ process.env.USERS_MICROSERVICE_PORT}...`);
}
bootstrap();
