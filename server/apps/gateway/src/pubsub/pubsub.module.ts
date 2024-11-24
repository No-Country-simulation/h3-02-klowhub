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
          protoPath: '../../protos/upload.proto', 
          url: `${process.env.UPLOAD_MICROSERVICE_HOST || "0.0.0.0"}:${process.env.UPLOAD_SERVICE_PORT || 3003}`,
        },
      },
    ]),
  ],
  controllers: [PubSubGatewayController],
  providers: [PubSubGatewayService],
})
export class PubSubModule {}