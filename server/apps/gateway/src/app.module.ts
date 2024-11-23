import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
@Module({
  imports: [AuthModule, UploadModule, CoursesModule],
})
export class AppModule {}
