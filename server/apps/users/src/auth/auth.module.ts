import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity]), EmailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
