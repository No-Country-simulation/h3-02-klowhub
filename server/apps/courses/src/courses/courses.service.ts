import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private ModelCourse: Model<Course>, // Asegúrate de que 'Course.name' esté correctamente referenciado
  ) {}

  async createCourse(data: CreateCourseDto) {
    console.log('Datos recibidos para crear curso:', data);

    try {
      // Creamos un objeto de curso de manera explícita para evitar errores con datos no proporcionados
    const courseData: any = {
      userId: data.userId, // Asegúrate de que siempre esté presente el ID del usuario
      title: data.title, // Asegúrate de que el título esté presente
      contentType: data.contentType || 'premium', // Default 'premium' si no se proporciona
      courseType: data.courseType || 'appsheet', // Default 'appsheet' si no se proporciona
      kind: data.kind || 'course', // Default 'course' si no se proporciona
      basicDescription: data.basicDescription, // Si no se proporciona, no se agrega
      prerequisites: data.prerequisites || [], // Default vacío si no se proporciona
      detailedContent: data.detailedContent, // Si no se proporciona, no se agrega
      imageUrl: data.imageUrl, // Si no se proporciona, no se agrega
      modules: data.modules || [], // Default vacío si no se proporciona
      status: 'in-progress', // Estado inicial del curso
      createdAt: new Date(), // Fecha de creación
      updatedAt: new Date(), // Fecha de actualización
    };

    // Crear el curso con los datos validados y asignados explícitamente
    const newCourse = new this.ModelCourse(courseData);
      return await newCourse.save(); // Guardamos el curso en la base de datos
    } catch (error) {
      throw new Error(`Error al crear el curso: ${error.message}`);
    }
  }
}
//constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }

// async createCourse(data: { title: string; description?: string }) {
//   const newCourse = new this.courseModel(data);
//   return newCourse.save();
// }

// async getAllCourses() {
//   return this.courseModel.find().exec();
// }

// async getCourse(){
//   return this.courseModel.find();
// }
// async getCourseId(id){
//   return await this.courseModel.findById(id);
// }

//   // Método para crear un curso
//   async create(createCourseDto: CreateCourseDto): Promise<Course> {
//     const course = new this.courseModel(createCourseDto);  // Usa el DTO para crear el curso
//     return course.save();  // Guarda el curso en la base de datos
//   }