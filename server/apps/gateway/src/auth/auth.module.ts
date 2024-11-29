import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import * as dotenv from 'dotenv';
import { GatewayModule } from '../gateway.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


dotenv.config();

@Module({
  imports: [
    forwardRef(() => GatewayModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtService],
  exports:[JwtModule]
})
export class AuthModule {}