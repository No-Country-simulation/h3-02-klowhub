import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { GatewayController } from './gateway.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UploadModule, CoursesModule,PubSubModule, UsersModule],
  controllers: [GatewayController],
})
export class AppModule {}
