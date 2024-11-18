import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerServiceAdapter } from './loggerAdapter.service';


@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        const logger = new LoggerServiceAdapter();
        logger.connect('trace');
        return logger;
      },
    },
  ],
  exports: [LoggerService],
})
export class CommonModule {}
