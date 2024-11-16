import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

@Module({
  imports: [
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
