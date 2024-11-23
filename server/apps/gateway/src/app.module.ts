import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [AuthModule, UploadModule],
})
export class AppModule {}
