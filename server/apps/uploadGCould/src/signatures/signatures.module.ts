import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignaturesService } from './signatures.service';
import { SignaturesController } from './signatures.controller';
import { CourseSchema } from '../schema/course.shema';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
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
        protoPath: join(__dirname, '../../protos/signatures.proto'), 
      },
    };
  }
}