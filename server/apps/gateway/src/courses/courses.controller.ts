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
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCourseGatewayDto, createCourseGatewaySchema } from './dto/create-course.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly cookieService: CookieService,
  ) { }

  @Post('create')
  @Roles('admin', 'user', 'creator')
  @UseGuards(RolesGuard)
  async createCourse(@Body() courseData: CreateCourseGatewayDto, @Request() req: any) {
    const userId = req.user?.id;

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

    try {
      // Envía los datos validados al microservicio
      const result = await lastValueFrom(
        this.coursesClient.send({ cmd: 'create_course' }, dataWithUserId)
      );
      return {
        message: 'Course created successfully',
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Error al crear curso'
      );
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
}