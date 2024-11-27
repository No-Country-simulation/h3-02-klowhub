import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PubSubService } from './pubsub.service';
import { PubSubController } from './pubsub.controller';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {
  static grpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: 'pubsub',
        protoPath: join(__dirname, './proto/pubsub.proto'),
      },
    };
  }
}