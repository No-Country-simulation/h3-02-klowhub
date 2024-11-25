import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { GatewayController } from './gateway.controller';
@Module({
  imports: [AuthModule, UploadModule, CoursesModule,PubSubModule],
  controllers: [GatewayController],
})
export class AppModule {}
