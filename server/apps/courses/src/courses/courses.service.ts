import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { Users } from './schemas/users.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Users.name) private usersModel: Model<Users>,
  ) {}

  async createCourse(data: CreateCourseDto, userId: string) {
    const courseData = {
      userId,
      title: data.title,
      contentType: data.contentType || 'premium',
      courseType: data.type || 'appsheet',
      kind: data.kind || 'course',
      basicDescription: data.basicDescription || '',
      prerequisites: data.prerequisites || [],
      detailedContent: data.detailedContent || '',
      imageUrl: data.imageUrl || '',
      modules: data.modules || [],
      status: 'in-progress',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // Crear el curso
      const newCourse = new this.courseModel(courseData);
      await newCourse.save(); // Guardar el curso en la base de datos

      // Verificar si el usuario existe
      let user = await this.usersModel.findOne({ userId });

      if (!user) {
        // Si el usuario no existe, crear una nueva instancia
        user = new this.usersModel({
          userId,
          createdCourses: [newCourse._id],
          enrolledCourses: [],
          progress: [],
        });
      } else {
        // Si el usuario existe, agregar el curso a la lista de cursos creados
        user.createdCourses.push(newCourse.id);
      }

      await user.save(); // Guardar el usuario en la base de datos

      return newCourse; // Retornar el curso creado
    } catch (error) {
      throw new Error(`Error al crear el curso: ${error.message}`);
    }
  }
}