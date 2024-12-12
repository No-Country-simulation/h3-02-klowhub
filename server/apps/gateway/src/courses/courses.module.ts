import { Controller, Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigEnvs} from '../config/envs'
import { HttpModule } from '@nestjs/axios';
import { CoursesService } from './courses.service'

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule,
  ],
  providers:[CoursesService],
  controllers:[CoursesController],
  exports:[CoursesService]
})
export class CoursesModule {}
