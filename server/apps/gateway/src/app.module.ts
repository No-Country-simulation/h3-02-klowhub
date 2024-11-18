import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/configuration';
import { IdentityModule } from './identity/identity.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HealthCheckModule,
    UsersModule,
    CoursesModule,
    IdentityModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
