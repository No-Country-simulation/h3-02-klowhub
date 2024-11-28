import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { GatewayController } from './gateway.controller';
import { SignaturesModule } from './signatures/signatures.gateway.module';
import { Sign } from 'crypto';
@Module({
  imports: [AuthModule, UploadModule, CoursesModule,PubSubModule,SignaturesModule],
  controllers: [GatewayController],
})
export class AppModule {}
