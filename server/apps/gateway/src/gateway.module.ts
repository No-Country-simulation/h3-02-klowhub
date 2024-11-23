import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controllers';
import { UploadController } from './upload/upload.controllers';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST || '0.0.0.0',
          port: parseInt(process.env.USERS_SERVICE_PORT, 10) || 3001,
        },
      },
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COURSES_SERVICE_HOST || '0.0.0.0',
          port: parseInt(process.env.COURSES_SERVICE_PORT, 10) || 3002,
        },
      },
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage',
          protoPath: 'src/proto/upload.proto',
          url: `${process.env.UPLOAD_MICROSERVICE_HOST || "0.0.0.0"}:${process.env.UPLOAD_SERVICE_PORT || 3003}`,
        },
      },
    ]),
  ],
  controllers: [AuthController, UploadController],
  providers: [],
})
export class GatewayModule {}
