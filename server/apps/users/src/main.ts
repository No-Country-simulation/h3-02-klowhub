import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

dotenv.config();

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
bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});
