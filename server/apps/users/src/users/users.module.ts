import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [UsersService],
  exports: [UsersService], // Exporta el servicio para que otros módulos puedan usarlo
})
export class UsersModule {}
