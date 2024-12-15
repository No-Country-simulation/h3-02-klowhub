import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  ConfigEnvs } from './config/envs';
import * as cookieParser from 'cookie-parser';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Logger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  app.useLogger(logLevels);
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
  Logger.log(`Users is running on: ${ConfigEnvs.COURSES_MICROSERVICE_PORT}`);
}
bootstrap().catch((err)=>{
  Logger.log("Global error handler");
  Logger.log(err);
  Logger.log("----------------------------------------------------------");
});

