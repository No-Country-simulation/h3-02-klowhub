import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigEnvs } from '../config/envs'
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from '../auth/auth.controllers'
import { GatewayModule } from 'src/gateway.module';

@Module({
  imports: [
    forwardRef(()=> GatewayModule),
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule,
  ],
  providers:[AuthService, JwtService],
  controllers:[AuthController],
  exports:[AuthService, JwtModule]
})
export class AuthModule {}