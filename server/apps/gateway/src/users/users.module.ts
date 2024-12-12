import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersController} from './users.controller';
import { GatewayModule } from 'src/gateway.module';
import { ConfigEnvs } from '../config/envs';

@Module({
  imports: [GatewayModule,
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [JwtService],
})
export class UsersModule {}
