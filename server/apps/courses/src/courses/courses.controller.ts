import { Controller, Post, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';  // Importa el DTO

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);  // Llama al servicio para crear el curso
  }

  // Otros métodos del controlador (por ejemplo, para obtener cursos, eliminar, etc.)
}
