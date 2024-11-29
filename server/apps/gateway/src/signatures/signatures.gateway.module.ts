import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SignaturesController } from './signatures.gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SIGNATURES_SERVICE', 
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage', 
          protoPath: join(__dirname,'../../protos/signatures.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST}:${process.env.UPLOAD_SERVICE_PORT}`,
        },
      },
    ]),
  ],
  controllers: [SignaturesController],
})
export class SignaturesModule {}