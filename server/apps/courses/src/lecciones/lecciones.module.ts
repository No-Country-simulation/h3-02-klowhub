import { Module } from '@nestjs/common';
import { LeccionesService } from './lecciones.service';
import { LeccionesController } from './lecciones.controller';

@Module({
  controllers: [LeccionesController],
  providers: [LeccionesService],
})
export class LeccionesModule {}
