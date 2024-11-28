import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { UsersController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class UsersModule {}
