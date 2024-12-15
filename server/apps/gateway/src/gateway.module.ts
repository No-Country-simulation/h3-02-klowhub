import { Module } from '@nestjs/common';
import { join } from "path";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ConfigEnvs } from './config/envs';
import { GatewayController } from './gateway.controller';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    CoursesModule,
    UsersModule,
  ],
  controllers: [
    GatewayController,
  ],
  providers:[],
})
export class GatewayModule {}
