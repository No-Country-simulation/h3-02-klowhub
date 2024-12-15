import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { UsersController } from './users.controller';
import { SeedService } from 'src/script/seed-users';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigEnvs } from 'src/config/envs';

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([UserEntity, AccountEntity ])],
  providers: [SeedService, UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
