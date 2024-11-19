import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
// import * as cookieParser from 'cookie-parser';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICE_HOST || '0.0.0.0', // Puedes usar una variable de entorno
        port: parseInt(process.env.MICROSERVICE_PORT, 10) || 3001, // También puedes definir el puerto en .env
      },
    },
  );

  await app.listen();
  console.log('Microservice is listening...');
  // const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  // // app.enableCors({
  // //   origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL permitida
  // //   credentials: true, // Permitir cookies
  // // });
  // await app.listen(process.env.PORT as string);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
