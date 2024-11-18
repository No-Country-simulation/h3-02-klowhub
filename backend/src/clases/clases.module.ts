import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { Clases } from './entities/clases.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Clases])
  ],
  controllers: [ClasesController],
  providers: [ClasesService]
})
export class ClasesModule {}
