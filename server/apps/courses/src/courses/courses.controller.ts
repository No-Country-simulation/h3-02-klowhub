import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateCourseDto, CreateCourseSchema } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  courseModel: any;
  constructor(private readonly coursesService: CoursesService) { }

  @MessagePattern({ cmd: 'createCourse' })
  async createCourse(courseData: CreateCourseDto) {
    // Validar los datos con Zod
    const validationResult = CreateCourseSchema.safeParse(courseData);
    if (!validationResult.success) {
      throw new RpcException({
        statusCode: 400,
        message: 'Validation error',
        errors: validationResult.error.errors,
      });
    }

    // Pasamos el userId al objeto de datos
    const courseDataWithUserId = {
      ...validationResult.data
    };

    try {
      // Delegamos la creación del curso al servicio
      const newCourse = await this.coursesService.createCourse(courseDataWithUserId);

      // Devolver el resultado
      return newCourse;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al crear el curso',
      });
    }
  }
  }

  // @Get('/')
  //   async getCourse(){
  //     return await this.coursesService.getCourse();
  //   }

  // @Get('/:id') 
  // async getCourseId(@Param('id') id:string) {
  //   return await this.coursesService.getCourseId(id);
  // } 

  //   @Post()
  //   async create(@Body() createCourseDto: CreateCourseDto){
  //    return await this.coursesService.create(createCourseDto); 
  //   }

  // Otros métodos del controlador (por ejemplo, para obtener cursos, eliminar, etc.)
