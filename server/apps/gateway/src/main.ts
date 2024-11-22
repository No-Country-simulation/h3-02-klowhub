import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Configuración de CORS
    credentials: true, // Permitir cookies
  });
  await app.listen(process.env.PORT || 3000);
  console.log(
    `Gateway is running on: http://localhost:${process.env.PORT || 3000}`,
  );
}
bootstrap();
