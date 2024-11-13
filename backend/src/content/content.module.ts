import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Module({
  providers: [ContentService],
  controllers: [ContentController]
})
export class ContentModule {}
