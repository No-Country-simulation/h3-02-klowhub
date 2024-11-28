import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controllers';
import * as dotenv from 'dotenv';
import { CookieService } from '../common/services/cookie.service';
import { GatewayModule } from '../gateway.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtTestService } from './services/jwt-test.service';


dotenv.config();

@Module({
  imports: [
    forwardRef(() => GatewayModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtService, JwtTestService],
  exports:[JwtTestService]
})
export class AuthModule {}