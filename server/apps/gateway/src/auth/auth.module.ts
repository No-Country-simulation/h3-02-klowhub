import { Module } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { CookieService } from '../common/services/cookie.service';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP, // Especifica el transporte TCP para la comunicación con el microservicio.
        options: {
          host: process.env.USERS_MICROSERVICE_HOST,
          port: Number(process.env.USERS_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [CookieService],
})
export class AuthModule {}
