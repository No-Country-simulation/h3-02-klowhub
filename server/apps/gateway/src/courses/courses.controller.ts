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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCourseGatewayDto, createCourseGatewaySchema } from './dto/create-course.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { JwtService } from '@nestjs/jwt';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtService
  ) { }

  @Post('create')
async createCourse(@Body() courseData: CreateCourseGatewayDto, @Request() req: any) {
  // Accede a las cookies usando req.cookies
  const token = req.cookies['auth_token']; // Verifica que el token esté en la cookie con este nombre

  if (!token) {
    throw new BadRequestException('Token de autenticación no proporcionado');
  }

  try {
    // Decodifica el token para obtener el userId
    const decoded: any = this.jwtService.decode(token);
    const userId = decoded.userId;

    if (!userId) {
      throw new BadRequestException('No se encontró el ID del usuario');
    }

    // Agrega `userId` a los datos del curso
    const dataWithUserId = { ...courseData, userId };

    // Valida los datos usando el esquema
    const validationResult = createCourseGatewaySchema.safeParse(dataWithUserId);

    // Si la validación falla, lanza un error con los detalles
    if (!validationResult.success) {
      throw new BadRequestException(validationResult.error.errors);
    }

    // Envía los datos validados al microservicio
    const result = await lastValueFrom(
      this.coursesClient.send({ cmd: 'create_course' }, dataWithUserId)
    );

    return {
      message: 'Course created successfully',
      data: result,
    };
  } catch (error) {
    throw new BadRequestException(error.message || 'Error al crear curso');
  }
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
  //buscar course por id
  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('El id del curso es requerido');
    }

    try {
      const course = await lastValueFrom(
        this.coursesClient.send({ cmd: 'get_course_by_id' }, id),
      );

      if (!course) {
        throw new BadRequestException(`Curso con id ${id} no encontrado`);
      }

      return {
        message: 'Curso obtenido exitosamente',
        data: course,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al obtener el curso',
      );
    }
  }
}