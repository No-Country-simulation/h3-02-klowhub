import {
  Controller,
  Post,
  Request,
  BadRequestException,
  Inject,
  UseGuards,
  Body,
  Get,
  Query,
  Param,
  Res,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { createCourseGatewaySchema } from './dto/create-course.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateCourseDto, createCourseSchema } from './dto/create.course.dto';
import { CreateLessonDto } from './dto/create.lesson.dto';
import { CreateModuleDto, createModuleSchema } from './dto/create.module.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly jwtService: JwtService
  ) { }

  @Post('create')
  async createCourse(@Body() courseData: CreateCourseDto, @Request() req: any) {
    // Accede al token desde las cookies
    const token = req.cookies.auth_token;

    // Si no se encuentra el token, lanza una excepción
    if (!token) {
      throw new BadRequestException('Token de autenticación no proporcionado');
    }
    const data = { token, ...courseData };
    const validationResult = createCourseSchema.safeParse(data);
    if (!validationResult.success) {
      return (validationResult.error)
    }
    const sanitizedData = validationResult.data
    // Envía los datos validados al microservicio
    const result = await lastValueFrom(
      this.coursesClient.send({ cmd: 'create_course' }, sanitizedData)
    );
    // Retorna el mensaje de éxito con el resultado
    return {
      message: 'Course created successfully',
      data: result,
    };
  }
  //buscar curso por filtro
  @Get('filter')
  async filterCourses(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() filters: Record<string, any>,
  ) {
    // Validación de parámetros de paginación
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum <= 0) {
      throw new BadRequestException('El parámetro "page" debe ser un número positivo');
    }

    if (isNaN(limitNum) || limitNum <= 0) {
      throw new BadRequestException('El parámetro "limit" debe ser un número positivo');
    }

    // Pasamos los filtros y parámetros al microservicio para obtener los cursos
    try {
      return await this.coursesClient.send({ cmd: 'filter_courses' }, { filters, page: pageNum, limit: limitNum });
    } catch (error) {
      throw new BadRequestException('Error al filtrar los cursos');
    }
  }
  // Obtener todos los cursos de un usuario
  @Get('mycourses')
  async getCoursesByUser(@Req() req: any) {
    const token = req.cookies.auth_token;
    
    if (!token) {
      throw new Error('Token JWT no encontrado en las cookies');
    }

    // Enviar el token al microservicio para obtener los cursos del usuario
    return this.coursesClient.send(
      { cmd: 'mycourses' },
      { token }
    );
  }

  // Obtener un curso específico por ID
  @Get('course/:id')
  async getCourseById(@Req() request: Request, @Request() req: any) {
    const token = req.cookies.auth_token;
    const courseId = req.params.id;

    if (!token) {
      throw new Error('Token JWT no encontrado en las cookies');
    }

    // Enviar el token y el ID del curso al microservicio
    return this.coursesClient.send(
      { cmd: 'course' },
      { token, courseId }
    );
  }
  // agregar un modulo a un curso
  @Post('course/:id')
  async addModuleCourse(@Req() request: Request, @Request() req: any , @Body()  moduleData: CreateModuleDto){
    const token = req.cookies.auth_token;
    const courseId = req.params.id;
    if (!token){
      throw new Error('Token JWT no encontrado en las cookies');
    }
    const data = {token, courseId, ...moduleData }
    console.log('data', data)
    const validationResult = createModuleSchema.safeParse(data);
    
    if(!validationResult.success) {
      return (validationResult.error)
    }
    const sanitizedData = validationResult.data
    const result = await lastValueFrom(
      this.coursesClient.send(
        { cmd: 'addModule'},
        sanitizedData
      )
    );
    return {
      data: result,
    }
  }  
}