import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    HealthCheckModule,
    UsersModule,
    CoursesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
