import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController} from './users.controller';
import { GatewayModule } from 'src/gateway.module';
import { ConfigEnvs } from '../config/envs';
import { UsersService} from  './users.service'
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [JwtService, UsersService],
  exports:[UsersService, JwtModule]
})
export class UsersModule {}
