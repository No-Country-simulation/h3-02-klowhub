// src/app.service.ts
import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.MICROSERVICE_HOST || '0.0.0.0',
        port: parseInt(process.env.MICROSERVICE_PORT, 10) || 3001,
      },
    });
  }
}
