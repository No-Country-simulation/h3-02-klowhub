import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AccountEntity } from './entities/accounts.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Define tu secreto de JWT
      signOptions: { expiresIn: '24h' },  // Opciones para la firma (como la expiración)
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),
    TypeOrmModule.forFeature([UserEntity, AccountEntity]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
