import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module'
import {ConfigEnvs} from './config/envs';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorInterceptor } from './middleware/error.interceptor';
import { JwtService } from '@nestjs/jwt';


async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
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
  console.log(`Gateway is running on: ${ConfigEnvs.PORT}`);
}
bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});
