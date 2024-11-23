import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CookieService } from '../common/services/cookie.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.COURSES_SERVICE_HOST,
          port: parseInt(process.env.COURSES_SERVICE_PORT, 10),
        },
      },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CookieService],
})
export class CoursesModule {}
