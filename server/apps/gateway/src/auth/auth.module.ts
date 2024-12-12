import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigEnvs } from '../config/envs'
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from '../auth/auth.controllers'

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule,
  ],
  providers:[AuthService],
  controllers:[AuthController],
  exports:[AuthService]
})
export class AuthModule {}