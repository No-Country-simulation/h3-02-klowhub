import { Controller, Body, Get, Post, Logger } from '@nestjs/common';
import { CoursesService, } from './courses.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCourseDto, createCourseSchema } from './dto/create.course.dto';


@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly jwtService: JwtService
  ) { }

  @Get('test')
  async test(@Body() any: any) {
    return ({
      message: 'Microserver Courses is run'
    })
  }

  @Post('create')
  async createCourse(@Body() data: { headers: any; body: { sanitizedData: CreateCourseDto } }) {
    const { token, ...courseData } = data.body.sanitizedData;
    const valiData = createCourseSchema.safeParse({ token, ...courseData });

    if (!valiData.success) {
      const validationErrors = valiData.error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`,
      );
      return {
        statusCode: 400,
        message: 'Validation errors',
        errors: validationErrors,
      };
    }

    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.userId;
      const createInstancia = await this.coursesService.createUserIfNotExists(userId);
      if(createInstancia){Logger.log('Instancia creada')};
      const newCourse = await this.coursesService.createCourse(data.body.sanitizedData);
      return {
        statusCode: 201,
        success: true,
        message: 'Curso creado exitosamente',
        data: newCourse,
      };
    } catch (error) {
      Logger.error('Error al procesar el curso:', error.message);
      return {
        statusCode: 500,
        success: false,
        message: 'Error al procesar la solicitud',
        error: error.message,
      };
    }
  }
  @Get('filter')
  async filterCourses(
    @Body() data: { 
      page: number; 
      limit: number; 
      filters: Record<string, any> },
  ) {
    Logger.log('Datos recibidos para filtrar cursos:', data);
    const { page, limit, filters } = data;

    try {
      const courses = await this.coursesService.filterCourses(filters, page, limit);
      return {
        statusCode: 200,
        success: courses.success,
        message: courses.message,
        data: courses.courses,
      };
    } catch (error) {
      Logger.error('Error al filtrar los cursos:', error.message);
      return {
        statusCode: 500,
        success: false,
        message: 'Error al filtrar los cursos',
        error: error.message,
      };
    }
  }
}

  // // Buscar curso por filtro
  // @MessagePattern({ cmd: 'filter_courses' })
  // async filterCourses(data: { page: number; limit: number; filters: Record<string, any> }) {
  //   Logger.log('Estos datos llegan del gateway:', data);
  //   const { page, limit, filters } = data;
  //   return this.coursesService.filterCourses(filters, page, limit);
  // }
  // // Obtener todos los cursos de un usuario específico
  // @MessagePattern({ cmd: 'mycourses' })
  // async getCoursesByUser(@Payload() data: { token: string }) {
  //   try {
  //     // Verificar el token JWT y extraer el userId
  //     const decoded = this.jwtService.verify(data.token);  // Verificar el token
  //     const userId = decoded.userId;  // Suponiendo que userId está en el payload del token

  //     // Obtener los cursos creados por el usuario
  //     const courses = await this.coursesService.getCoursesByUser(userId);
  //     return courses;
  //   } catch (error) {
  //     throw new RpcException({
  //       statusCode: 500,
  //       message: error.message || 'Error al obtener los cursos del usuario',
  //     });
  //   }
  // }

  // // Obtener un curso específico por ID
  // @MessagePattern({ cmd: 'course' })
  // async getCourseById(@Payload() data: { token: string; courseId: string }) {
  //   try {
  //     // Verificar el token JWT y extraer el userId
  //     const decoded = this.jwtService.verify(data.token);  // Verificar el token
  //     const userId = decoded.userId;  // Suponiendo que userId está en el payload del token

  //     // Obtener el curso por ID
  //     const course = await this.coursesService.findCourseById(data.courseId, userId);
  //     if (!course) {
  //       throw new RpcException({
  //         statusCode: 404,
  //         message: 'Curso no encontrado',
  //       });
  //     }

  //     return course;
  //   } catch (error) {
  //     throw new RpcException({
  //       statusCode: 500,
  //       message: error.message || 'Error al obtener el curso',
  //     });
  //   }
  // }
  // // Agregar módulo a un curso
  // @MessagePattern({ cmd: 'addModule' })  // Escuchamos el patrón enviado por el gateway
  // async handleAddModule(data: CreateModuleDto ) {
  //   // Validación de los datos recibidos usando Zod
  //   const valiData = createModuleSchema.safeParse(data);
  //   if (!valiData.success) {
  //     const validationErrors = valiData.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
  //     throw new RpcException({
  //       statusCode: 400,
  //       message: 'Validation errors',
  //       errors: validationErrors,
  //     });
  //   }

  //   // Llamada al servicio con los datos validados
  //   return this.coursesService.addModule(valiData.data);
  // }

  // // add lesson
  // @MessagePattern({cmd: 'add-lesson'})
  // async addLessonToModule(data: CreateLessonDto) {
  //   const valiData = createLessonSchema.safeParse(data);
  //   if (!valiData.success) {
  //     const validationErrors = valiData.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
  //     throw new RpcException({
  //       statusCode: 400,
  //       message: 'Validation errors',
  //       errors: validationErrors,
  //     });
  //   }
  //   return this.coursesService.addLessonToModule(valiData.data)
  //   }

