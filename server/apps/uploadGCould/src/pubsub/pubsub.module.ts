import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PubSubService } from './pubsub.service';
import { Lesson } from '../schema/lesson.schema';
import { join } from 'path';
import { PubSubController } from './pubsub.controller';
import { GrpcOptions, Transport } from '@nestjs/microservices';


@Module({
  imports: [ConfigModule,
    MongooseModule.forFeature([{ name: 'Lesson', schema: Lesson }]),
  ],
  controllers: [PubSubController],
  providers: [PubSubService],
})
export class PubSubModule {
  static grpcOptions(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: 'googlecloudstorage',
        protoPath: join(__dirname, './proto/pubsub.proto'),
      },
    };
  }
}