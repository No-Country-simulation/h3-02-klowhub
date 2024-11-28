import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/accounts.entity';
import { EmailModule } from './email/email.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([UserEntity, AccountEntity]),
    UsersModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController, UsersService],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
