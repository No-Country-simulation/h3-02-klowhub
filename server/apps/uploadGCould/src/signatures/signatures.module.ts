import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignaturesService } from './signatures.service';
import { SignaturesController } from './signatures.controller';
import { Lesson } from '../schema/lesson.schema';
import { GrpcOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lesson', schema: Lesson }]),
  ],
  providers: [SignaturesService],
  controllers: [SignaturesController],
})
export class SignaturesModule {
  static grpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: 'googlecloudstorage',
        protoPath: 'src/signatures/signatures.proto',
      },
    };
  }
}