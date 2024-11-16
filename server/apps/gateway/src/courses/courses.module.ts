import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';


@Module({
  imports: [],
  controllers: [CoursesController],
})
export class CoursesModule {}
