import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_SERVICE_HOST || 'localhost', // Por defecto 'localhost' si no está configurado
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
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
