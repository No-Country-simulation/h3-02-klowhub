import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ConfigEnvs } from './config/envs';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*", 
    credentials: true, 
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  });
  app.use(cookieParser());
  const jwtService = app.get(JwtService);
  const authMiddleware = new AuthMiddleware(jwtService);
  app.use(authMiddleware.use.bind(authMiddleware));
  await app.listen(ConfigEnvs.COURSES_MICROSERVICE_PORT);
  console.log(`Users is running on: ${ConfigEnvs.COURSES_MICROSERVICE_PORT}`);
}
bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});

