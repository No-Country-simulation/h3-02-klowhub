import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CourseSchema } from './course.shema';  // Importa el esquema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),  // Registra el modelo en el módulo
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
