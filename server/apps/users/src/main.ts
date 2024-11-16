import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:3001`,
      package: 'users',       
      protoPath: join(__dirname, '../_proto/users.proto'),
    },
  });
  
  return app.listen();
}
bootstrap();
