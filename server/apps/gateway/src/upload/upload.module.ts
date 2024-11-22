import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UploadController } from './upload.controllers';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE', 
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage', 
          protoPath: 'src/proto/upload.proto', 
          url: '0.0.0.0:50051',
        },
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}