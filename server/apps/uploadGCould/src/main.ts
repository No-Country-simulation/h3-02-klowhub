import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module'; 
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'googlecloudstorage',
      protoPath: [
        join(__dirname, '../protos/storage.proto'),
        join(__dirname, '../protos/signatures.proto'),
        join(__dirname, '../protos/pubsub.proto'),
      ], 
      url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
      maxReceiveMessageLength: 10 * 1024 * 1024,  
      maxSendMessageLength: 10 * 1024 * 1024,    
    },
  });

  await app.listen();
  console.log(`gRPC microservice is listening on: ${process.env.UPLOAD_SERVICE_PORT}...`);
}

bootstrap().catch((err)=>{
  console.log("Global error handler");
  console.log(err);
  console.log("----------------------------------------------------------");
});
