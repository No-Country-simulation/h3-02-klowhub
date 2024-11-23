import { Controller } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateCourseSchema } from './dto/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  
  @MessagePattern({ cmd: 'createCourse' })
  async createCourse(courseData: any) {
    // Validar los datos con Zod
    const validationResult = CreateCourseSchema.safeParse(courseData);
    if (!validationResult.success) {
      throw new RpcException({
        statusCode: 400,
        message: 'Validation error',
        errors: validationResult.error.errors,
      });
    }

    // Llamar al servicio para guardar el curso
    return this.coursesService.createCourse(validationResult.data);
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
}
