import { Module } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE', // Nombre del cliente
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3001, // Puerto donde corre el microservicio
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
