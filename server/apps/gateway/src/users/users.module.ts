import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController} from './users.controller';
import * as dotenv from 'dotenv';
import { GatewayModule } from 'src/gateway.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
dotenv.config();

@Module({
  imports: [GatewayModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Usa tu clave secreta desde el archivo .env
      signOptions: { expiresIn: '24h' }, // Tiempo de expiración del token (ajústalo según lo necesario)
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',  // Este es el nombre que has configurado en el Gateway
        transport: Transport.TCP,
        options: {
          host: process.env.USERS_MICROSERVICE_HOST,
          port: Number(process.env.USERS_MICROSERVICE_PORT),
        },
      },
    ])
  ],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}
