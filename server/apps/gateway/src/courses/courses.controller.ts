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
}