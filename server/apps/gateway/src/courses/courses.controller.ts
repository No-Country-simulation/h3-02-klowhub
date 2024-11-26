import {
  Controller,
  Post,
  Request,
  BadRequestException,
  Inject,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateCourseSchema, CreateCourseDto } from './dto/create-course.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly coursesClient: ClientProxy,
    private readonly cookieService: CookieService,
  ) {}

  @Post('create')
  @Roles('admin', 'user') // para prueba se dejo en user luego se agrega el permiso correspondiente
  @UseGuards(RolesGuard)
  async createCourse(@Body() courseData: CreateCourseDto, @Request() req: any) {
    const userId = req.user.id;
    console.log('este es la id del usuario', userId);

    if (!userId) {
      throw new BadRequestException('No se encontró el ID del usuario');
    }
    try {
      // Añadir `userId` a los datos recibidos del body
      const dataWithUserId = { ...courseData, userId };
      // Validar los datos con Zod
      const validationResult = CreateCourseSchema.safeParse(dataWithUserId);
      if (!validationResult.success) {
        console.log('Errores de validación:', validationResult.error.format());
        throw new BadRequestException(validationResult.error.errors);
      }

      // Enviar los datos al microservicio
      const result = await lastValueFrom(
        this.coursesClient.send({ cmd: 'createCourse' }, validationResult.data),
      );
      console.log('Curso creado con éxito:', result);
      return result;
    } catch (error) {
      console.error('Error al crear el curso:', error);
      throw new BadRequestException(error.message || 'Error al crear el curso');
    }
  }
}
