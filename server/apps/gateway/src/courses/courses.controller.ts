import {
  Controller,
  Post,
  Body,
  Request,
  BadRequestException,
  Inject,
  UseGuards,
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
  async createCourse(@Body() courseData: any, @Request() req: any) {
    const userId = req.user?.Id;

    if (!userId) {
      throw new BadRequestException('No se encontró el ID del usuario');
    }
    try {
      // Validar los datos con Zod
      const validationResult = CreateCourseSchema.safeParse(courseData);
      if (!validationResult.success) {
        throw new BadRequestException(validationResult.error.errors);
      }

      // Enviar los datos al microservicio con el userId
      const createCourseDto: CreateCourseDto = {
        ...validationResult.data,
        userId,
      };

      const result = await lastValueFrom(
        this.coursesClient.send({ cmd: 'createCourse' }, createCourseDto),
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message || 'Error al crear el curso');
    }
  }
}
