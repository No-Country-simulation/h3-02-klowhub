import { Module } from '@nestjs/common';
import { ReputacionController } from './reputacion.controller';
import { ReputacionService } from './reputacion.service';

@Module({
  controllers: [ReputacionController],
  providers: [ReputacionService]
})
export class ReputacionModule {}
