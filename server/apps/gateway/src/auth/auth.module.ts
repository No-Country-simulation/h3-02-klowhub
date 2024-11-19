import { Module } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP, // Especifica el transporte TCP para la comunicación con el microservicio.
        options: {
          host: process.env.USERS_MICROSERVICE_HOST, // La dirección del microservicio, usando la variable de entorno correcta.
          port: parseInt(process.env.USERS_SERVICE_PORT, 10), // El puerto del microservicio, parseado como número.
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
