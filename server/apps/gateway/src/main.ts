import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorInterceptor } from './middleware/error.interceptor';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.use(cookieParser());
  const jwtService = app.get(JwtService);
  const authMiddleware = new AuthMiddleware(jwtService);

  app.use(authMiddleware.use.bind(authMiddleware));
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    credentials: true, // Permitir cookies
  });
  console.log(`Gateway is running on: 3000`);
  await app.listen(process.env.PORT);
}
bootstrap();
