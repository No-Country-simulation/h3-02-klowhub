import { Module } from '@nestjs/common';
import { UsersController} from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { CookieService } from '../common/services/cookie.service';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP, // Especifica el transporte TCP para la comunicación con el microservicio.
        options: {
          host: process.env.USERS_MICROSERVICE_HOST, // La dirección del microservicio, usando la variable de entorno correcta.
          port: parseInt(process.env.USERS_MICROSERVICE_PORT, 10), // El puerto del microservicio, parseado como número.
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [CookieService],
})
export class UsersModule {}
