import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { UsersController } from './users.controller'
import { SeedService } from 'src/script/seed-users';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [SeedService, UsersService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
