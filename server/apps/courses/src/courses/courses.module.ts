import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { JwtModule } from '@nestjs/jwt';
import { Users, UsersSchema } from './schemas/users.schema';
import { Modules, ModulesSchema } from './schemas/module.schema';
import { Lesson, LessonSchema } from './schemas/lesson.module.schema'
import { ConfigEnvs} from '../config/envs'

@Module({
  imports: [
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema }, 
      { name: Users.name, schema: UsersSchema },
      { name: Modules.name, schema: ModulesSchema},
      { name: Lesson.name, schema: LessonSchema}
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
