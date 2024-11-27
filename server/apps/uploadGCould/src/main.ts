import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module'; // Usa tu AppModule que importe todos los módulos
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'googlecloudstorage',
      protoPath: [
        join(__dirname, '../src/storage/proto/storage.proto'),
        join(__dirname, '../src/signatures/proto/signatures.proto'),
        join(__dirname, '../src/pubsub/proto/pubsub.proto'),
      ], 
      url: `${process.env.UPLOAD_MICROSERVICE_HOST || '0.0.0.0'}:${process.env.UPLOAD_SERVICE_PORT || 3003}`,
      maxReceiveMessageLength: 10 * 1024 * 1024,  
      maxSendMessageLength: 10 * 1024 * 1024,    
    },
  });

  await app.listen();
  console.log('gRPC microservice is listening...');
}

bootstrap();