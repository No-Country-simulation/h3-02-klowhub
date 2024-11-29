import { Controller, Post, Body } from '@nestjs/common';
import { CreateCourseDto, createCourseSchema } from './dto/create.course.dto';
import { CoursesService } from './courses.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { z } from 'zod';
import { JwtService } from '@nestjs/jwt';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly jwtService: JwtService
  ) {}

  @MessagePattern({ cmd: 'create_course' })
  async createCourse(@Payload() data: { token: string; data: CreateCourseDto }) {
    console.log('Datos recibidos por el gateway:', data);
    const valiData = createCourseSchema.safeParse(data);

    // Si la validación falla
    if (!valiData.success) {
      const validationErrors = valiData.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      throw new RpcException({
        statusCode: 400,
        message: 'Validation errors',
        errors: validationErrors,
      });
    }

    try {
      // Verificar el token JWT y extraer el userId
      const decoded = this.jwtService.verify(data.token);  // Verificar el token
      const userId = decoded.userId;  // Suponiendo que userId está en el payload del token
      console.log(decoded)

      // Combina el `userId` con los datos del curso
      const courseDataWithUserId = {
        ...valiData.data,
        userId, // Asigna el userId extraído del token
      };

      // Delegar la creación del curso al servicio
      const newCourse = await this.coursesService.createCourse(courseDataWithUserId);
      return newCourse;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al crear el curso',
      });
    }
  }

  // Buscar curso por filtro
  @MessagePattern({ cmd: 'filter_courses' })
  async filterCourses(data: { page: number; limit: number; filters: Record<string, any> }) {
    console.log('Estos datos llegan del gateway:', data);
    const { page, limit, filters } = data;
    return this.coursesService.filterCourses(filters, page, limit);
  }
  // Obtener todos los cursos de un usuario específico
  @MessagePattern({ cmd: 'mycourses' })
  async getCoursesByUser(@Payload() data: { token: string }) {
    try {
      // Verificar el token JWT y extraer el userId
      const decoded = this.jwtService.verify(data.token);  // Verificar el token
      const userId = decoded.userId;  // Suponiendo que userId está en el payload del token

      // Obtener los cursos creados por el usuario
      const courses = await this.coursesService.getCoursesByUser(userId);
      return courses;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al obtener los cursos del usuario',
      });
    }
  }

  // Obtener un curso específico por ID
  @MessagePattern({ cmd: 'course' })
  async getCourseById(@Payload() data: { token: string; courseId: string }) {
    try {
      // Verificar el token JWT y extraer el userId
      const decoded = this.jwtService.verify(data.token);  // Verificar el token
      const userId = decoded.userId;  // Suponiendo que userId está en el payload del token

      // Obtener el curso por ID
      const course = await this.coursesService.findCourseById(data.courseId, userId);
      if (!course) {
        throw new RpcException({
          statusCode: 404,
          message: 'Curso no encontrado',
        });
      }

      return course;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al obtener el curso',
      });
    }
  }
}
