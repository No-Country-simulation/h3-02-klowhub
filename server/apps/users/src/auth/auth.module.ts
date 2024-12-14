import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigEnvs } from '../config/envs';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AccountEntity } from 'src/entities/accounts.entity';
import { UsersService } from 'src/users/users.service';
import { EmailService } from './email/email.service';
import { GoogleStrategy } from './google/google.strategy';
import {EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ UserEntity, AccountEntity]),
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, EmailService, GoogleStrategy],
  exports:[AuthService],
})
export class AuthModule {}
