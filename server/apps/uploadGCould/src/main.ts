import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GoogleCloudStorageModule  } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(GoogleCloudStorageModule , {
    transport: Transport.GRPC,
    options: {
      package: 'googlecloudstorage',
      protoPath: join(__dirname, '../protos/upload.proto'), 
      url: 'localhost:50051',
      maxReceiveMessageLength: 10 * 1024 * 1024,  // Límite de 10 MB
      maxSendMessageLength: 10 * 1024 * 1024,    // Límite de 10 MB
    },
  });

  await app.listen();
  console.log('gRPC microservice is listening...');
}

bootstrap();