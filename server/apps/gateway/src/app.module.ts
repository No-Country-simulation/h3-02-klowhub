import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { PubSubModule } from './pubsub/pubsub.module';
@Module({
  imports: [AuthModule, UploadModule, PubSubModule],
})
export class AppModule {}
