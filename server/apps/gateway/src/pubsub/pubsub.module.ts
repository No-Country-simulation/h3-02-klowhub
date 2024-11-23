import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubGatewayController } from './pubsub.gateway.controller';
import { PubSubGatewayService } from './pubsub.gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PUBSUB_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage', 
          protoPath: 'src/proto/upload.proto', 
          url: '0.0.0.0:50051',
        },
      },
    ]),
  ],
  controllers: [PubSubGatewayController],
  providers: [PubSubGatewayService],
})
export class PubSubModule {}