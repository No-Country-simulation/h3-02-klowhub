import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';

@Module({
  providers: [ClasesService]
})
export class ClasesModule {}
