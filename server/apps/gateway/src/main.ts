import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(new AuthMiddleware().use);
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, // Permitir cookies
  });
  console.log(`Gateway is running on: ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
