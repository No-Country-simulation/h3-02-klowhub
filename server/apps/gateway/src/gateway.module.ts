import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controllers';
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
          host: process.env.COURSES_SERVICE_HOST || 'localhost',
          port: parseInt(process.env.COURSES_SERVICE_PORT, 10) || 3002,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class GatewayModule {}
