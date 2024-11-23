import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),  // Registra el modelo en el módulo
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
