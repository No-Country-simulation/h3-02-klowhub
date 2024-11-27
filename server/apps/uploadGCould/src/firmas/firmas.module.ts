import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FirmasService } from './firmas.service';
import { FirmasController } from './firmas.controller';
import { ModuleSchema } from '../schema/module.schema';
import { GrpcOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Module', schema: ModuleSchema }]),
  ],
  providers: [FirmasService],
  controllers: [FirmasController],
})
export class FirmasModule {
  static grpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: 'frinas',
        protoPath: 'src/frinas/frinas.proto',
      },
    };
  }
}