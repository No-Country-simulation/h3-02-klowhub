import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controllers';
import { UploadController } from './upload/upload.controllers';
import { UsersController } from './users/users.controller'
import { join } from "path";
import * as dotenv from 'dotenv';
import { CookieService } from './common/services/cookie.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_MICROSERVICE_HOST,
          port: parseInt(process.env.USERS_MICROSERVICE_PORT, 10),
        },
      },
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COURSES_MICROSERVICE_HOST,
          port: parseInt(process.env.COURSES_MICROSERVICE_PORT, 10),
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
    ]),
  ],
  controllers: [AuthController, UploadController, UsersController],
  providers: [CookieService],
})
export class GatewayModule {}
