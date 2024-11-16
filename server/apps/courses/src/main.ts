import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `localhost:3002`,
      package: 'courses',       
      protoPath: join(__dirname, '../_proto/courses.proto'),
    },
  });
  
  return app.listen();
}
bootstrap();
