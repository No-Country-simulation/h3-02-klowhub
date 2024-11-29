import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GoogleCloudStorageModule  } from './app.module';
import { join } from "path";


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(GoogleCloudStorageModule , {
    transport: Transport.GRPC,
    options: {
      package: 'googlecloudstorage',
      protoPath: join(__dirname, '../protos/upload.proto'), 
      url: `${process.env.UPLOAD_MICROSERVICE_HOST || "0.0.0.0"}:${process.env.UPLOAD_SERVICE_PORT}`,
      maxReceiveMessageLength: 30 * 1024 * 1024,
      maxSendMessageLength: 30 * 1024 * 1024,
    },
  });

  await app.listen();
  console.log(`gRPC microservice is listening on: ${process.env.UPLOAD_SERVICE_PORT}...`);
}

bootstrap();