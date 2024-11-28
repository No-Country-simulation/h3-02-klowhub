import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignaturesService } from './signatures.service';
import { SignaturesController } from './signatures.controller';
import { Course, CourseSchema } from '../schema/course.shema';
import { GrpcOptions, Transport } from '@nestjs/microservices';

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
        protoPath: 'src/signatures/signatures.proto',
      },
    };
  }
}