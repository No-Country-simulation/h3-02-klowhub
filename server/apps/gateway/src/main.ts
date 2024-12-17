import { GatewayModule } from './gateway.module'
import {ConfigEnvs} from './config/envs';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorInterceptor } from './middleware/error.interceptor';
import { JwtService } from '@nestjs/jwt';
import { NestFactory } from '@nestjs/core';
import { Logger, LogLevel } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  app.useLogger(logLevels);
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
  await app.listen(ConfigEnvs.PORT);
  Logger.log(`Gateway is running on: ${ConfigEnvs.PORT}`);
}
bootstrap().catch((err)=>{
  Logger.log("Global error handler");
  Logger.log(err);
  Logger.log("----------------------------------------------------------");
});
