import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { PubSubModule } from './pubsub/pubsub.module';
@Module({
  imports: [AuthModule, UploadModule, CoursesModule,PubSubModule],
})
export class AppModule {}
