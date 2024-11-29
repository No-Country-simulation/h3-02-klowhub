// src/storage/storage.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule], 
  controllers: [StorageController], 
  providers: [StorageService], 
})
export class StorageModule {
  static grpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC, 
      options: {
        package: 'googlecloudstorage',  
        protoPath: join(__dirname, '../../protos/storage.proto'), 
      },
    };
  }
}