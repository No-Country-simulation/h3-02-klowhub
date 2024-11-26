import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UploadController } from './upload.controllers';
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'UPLOAD_SERVICE', 
        transport: Transport.GRPC,
        options: {
          package: 'googlecloudstorage', 
          protoPath: join(__dirname,'../../protos/upload.proto'),
          url: `${process.env.UPLOAD_MICROSERVICE_HOST || "0.0.0.0"}:3003`,
        },
      },
    ]),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}