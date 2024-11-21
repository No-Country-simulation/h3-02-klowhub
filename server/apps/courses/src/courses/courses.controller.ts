import { Controller, Post, Body,Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';  // Importa el DTO

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

@Get('/')
  async getCourse(){
    return await this.coursesService.getCourse();
  }

@Get('/:id') 
async getCourseId(@Param('id') id:string) {
  return await this.coursesService.getCourseId(id);
} 

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto){
   return await this.coursesService.create(createCourseDto); 
  }

  // Otros métodos del controlador (por ejemplo, para obtener cursos, eliminar, etc.)
}
