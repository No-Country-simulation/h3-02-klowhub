import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubGatewayController } from './pubsub.gateway.controller';
import { PubSubGatewayService } from './pubsub.gateway.service';
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PUBSUB_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage', 
          protoPath: join(__dirname,'../../protos/upload.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
        },
      },
    ]),
  ],
  controllers: [PubSubGatewayController],
  providers: [PubSubGatewayService],
})
export class PubSubModule {}