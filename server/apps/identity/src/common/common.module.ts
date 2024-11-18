import { Module } from '@nestjs/common';

import { CommonServiceAdapter } from './services/common.service.adapter';
import { CommonService } from './interfaces/common.service';

@Module({
  providers: [
    {
      provide: CommonService,
      useClass: CommonServiceAdapter,
    },
  ],
  exports: [CommonService],
})
export class CommonModule {}
