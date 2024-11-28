import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CookieService } from '../common/services/cookie.service';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [
    JwtModule,
    ClientsModule.register([
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COURSES_SERVICE_HOST,
          port: Number(process.env.COURSES_SERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CookieService],
})
export class CoursesModule {}
