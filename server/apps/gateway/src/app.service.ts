// src/app.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RegisterDto } from './auth/dto/register.dto';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICE_HOST || 'localhost', // Dirección del microservicio
        port: parseInt(process.env.MICROSERVICE_PORT, 10) || 3001, // Puerto del microservicio
      },
    });
  }

  async registerUser(registerDto: RegisterDto): Promise<any> {
    return this.client.send({ cmd: 'register' }, registerDto).toPromise();
  }
}
