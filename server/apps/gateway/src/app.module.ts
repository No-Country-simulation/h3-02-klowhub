import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { LoggerService } from './common/logger.service';
import { LoggerServiceAdapter } from './common/loggerAdapter.service';

@Module({
  imports: [
    HealthCheckModule,
    UsersModule,
    CoursesModule
  ],
  controllers: [],
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        const logger = new LoggerServiceAdapter();
        logger.connect('trace');
        return logger;
      },
    }
  ],
})
export class AppModule {}
