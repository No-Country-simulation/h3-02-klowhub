import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { CoursesModule } from './courses/courses.module';
import { PubSubModule } from './pubsub/pubsub.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SignaturesModule } from './signatures/signatures.gateway.module';
import { GatewayModule } from './gateway.module';
import { GatewayController } from './gateway.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    GatewayModule,
    UploadModule,
    CoursesModule,
    PubSubModule,
    UsersModule,
    SignaturesModule,
    CoursesModule,
  ],
  controllers: [GatewayController],
})
export class AppModule {}
