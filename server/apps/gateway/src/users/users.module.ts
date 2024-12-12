import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import * as dotenv from 'dotenv';
import { GatewayModule } from 'src/gateway.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

dotenv.config();

@Module({
  imports: [
    GatewayModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP, // Cambiar según sea necesario
        options: {
          host: process.env.USERS_MICROSERVICE_HOST,
          port: Number(process.env.USERS_MICROSERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}