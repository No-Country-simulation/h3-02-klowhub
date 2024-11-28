import { Controller, Post, Body } from '@nestjs/common';
import { CreateCourseDto, createCourseSchema } from './dto/create-course.dto';
import { CoursesService } from './courses.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { z } from 'zod';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }


  @MessagePattern({ cmd: 'create_course' }) // Este patrón lo escucharás desde el gateway
  async createCourse(data) {
    console.log('datos recibidos por el gateway', data)
    const valiData = createCourseSchema.safeParse(data);
    if (!valiData.success) {
      throw new RpcException({
        statusCode: 400,
        message: 'Validation errors',
        errors: valiData.error.errors,
      });
    }
    //
    const courseDataWithUserId = {
      ...valiData.data
    };
    try {
      // Delegamos la creación del curso al servicio
      const newCourse = await this.coursesService.createCourse(courseDataWithUserId, courseDataWithUserId.userId);

      // Devolver el resultado
      return newCourse;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al crear el curso',
      });
    }
  }
  //buscar curso por filtro
  @MessagePattern({cmd: 'filter_courses'})
  async filterCourses(data: { page: number; limit: number; filters: Record<string, any> }) {
    console.log('estos datosllegan del gateway', data )
    const { page, limit, filters } = data;
    return this.coursesService.filterCourses(filters, page, limit);
  }
  // course by id
  @MessagePattern({cmd:'get_course_by_id'})
  async getCourseById(@Payload() id: string) {
    try {
      
      const course = await this.coursesService.findById(id);

      if (!course) {
        throw new Error(`Curso con id ${id} no encontrado`);
      }

      return course;
    } catch (error) {
      throw new Error(error.message || 'Error al obtener curso');
    }
  }
}