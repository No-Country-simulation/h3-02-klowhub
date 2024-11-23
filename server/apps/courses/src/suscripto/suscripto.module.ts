import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscriptoController } from './suscripto.controller';
import { SuscriptoService } from './suscripto.service';
import { Suscrito } from './entities/suscrito.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscrito])
  ],
  controllers: [SuscriptoController],
  providers: [SuscriptoService]
})
export class SuscriptoModule {}
