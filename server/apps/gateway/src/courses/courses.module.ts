import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { ClientsModule } from '@nestjs/microservices';
import { CoursesServiceClientOptions } from './courses-svc.options';


@Module({
  imports: [ClientsModule.register([{name: "COURSE_SERVICE", ...CoursesServiceClientOptions}]),],
  controllers: [CoursesController],
})
export class CoursesModule {}
