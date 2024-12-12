import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controllers';
import { UploadController } from './upload/upload.controllers';
import { PubSubGatewayController } from './pubsub/pubsub.gateway.controller';
import { SignaturesController } from './signatures/signatures.gateway.controller';
import { UsersController } from './users/users.controller';
import { join } from "path";
import * as dotenv from 'dotenv';
import { PubSubGatewayService } from './pubsub/pubsub.gateway.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CoursesController } from './courses/courses.controller';
import { HttpModule } from '@nestjs/axios';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule,
    ClientsModule.register([
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COURSES_MICROSERVICE_HOST,
          port: Number(process.env.COURSES_MICROSERVICE_PORT),
        },
      },
      {
        name: 'UPLOAD_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage',
          protoPath: join(__dirname,'../protos/upload.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
        },
      },
      {
        name: 'SIGNATURES_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage',
          protoPath: join(__dirname,'../protos/upload.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
        },
      },
      {
        name: 'PUBSUB_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage',
          protoPath: join(__dirname,'../protos/upload.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
        },
      },
    ]),
  ],
  controllers: [AuthController, UploadController, UsersController,
    PubSubGatewayController,SignaturesController, CoursesController],
  providers: [PubSubGatewayService],
})
export class GatewayModule {}
