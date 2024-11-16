import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
  ],
  providers: [],
  controllers: [CoursesController],
})
export class CoursesModule {}
