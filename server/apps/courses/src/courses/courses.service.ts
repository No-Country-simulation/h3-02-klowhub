import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.shema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,  // Inyecta el modelo Course
  ) {}

async getCourse(){
  return this.courseModel.find();
}
async getCourseId(id){
  return await this.courseModel.findById(id);
}

  // Método para crear un curso
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new this.courseModel(createCourseDto);  // Usa el DTO para crear el curso
    return course.save();  // Guarda el curso en la base de datos
  }

  // Otros métodos de servicio (por ejemplo, para listar cursos, eliminar, etc.)
}