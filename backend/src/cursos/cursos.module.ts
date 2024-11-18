import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { Cursos } from './entities/cursos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cursos])
  ],
  controllers: [CursosController],
  providers: [CursosService]
})
export class CursosModule {}
