import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorInterceptor } from './middleware/error.interceptor';
import { JwtService } from '@nestjs/jwt';

dotenv.config();
console.log({ MICRO_HOST: process.env.USERS_MICROSERVICE_HOST});
console.log({ PORT: process.env.PORT});
console.log(process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*", 
    credentials: true, 
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  });
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.use(cookieParser());
  const jwtService = app.get(JwtService);
  const authMiddleware = new AuthMiddleware(jwtService);
  app.use(authMiddleware.use.bind(authMiddleware));
  await app.listen(process.env.PORT);
  console.log(`Gateway is running on: ${process.env.PORT}`);
}
bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});
