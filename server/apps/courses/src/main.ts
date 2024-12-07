import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

dotenv.config();
console.log({ MICRO_HOST: process.env.COURSES_MICROSERVICE_HOST});
console.log({ PORT: process.env.COURSES_MICROSERVICE_PORT});

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.COURSES_MICROSERVICE_HOST,
        port: Number(process.env.COURSES_MICROSERVICE_PORT),
      },
    },
  );

  await app.listen();
  console.log('Microservice Courses is listening...', process.env.COURSES_MICROSERVICE_PORT);
}

bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});

