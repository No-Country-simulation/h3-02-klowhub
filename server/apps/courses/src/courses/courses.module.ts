import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtModule } from '@nestjs/jwt';
import { Users, UsersSchema } from './schemas/users.schema';
import { Modules, ModulesSchema } from './schemas/module.schema';
import { Lesson, LessonSchema } from './schemas/lesson.module.schema'
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Define tu secreto de JWT
      signOptions: { expiresIn: '24h' },  // Opciones para la firma (como la expiración)
    }),
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema }, 
      { name: Users.name, schema: UsersSchema },
      { name: Modules.name, schema: ModulesSchema},
      { name: Lesson.name, schema: LessonSchema}
    ]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
