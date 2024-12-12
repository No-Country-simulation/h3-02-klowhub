import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import * as dotenv from 'dotenv';
import { GatewayModule } from 'src/gateway.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { HttpModule } from '@nestjs/axios';

dotenv.config();

@Module({
  imports: [
    HttpModule, 
    GatewayModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}