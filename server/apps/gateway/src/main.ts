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
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
    credentials: true, // Permitir cookies
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`Gateway is running on: ${process.env.PORT || 3000}`);
}
bootstrap();
