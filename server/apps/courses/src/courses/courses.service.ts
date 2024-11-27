import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { Users } from './schemas/users.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Users.name) private usersModel: Model<Users>,
  ) { }

  async createCourse(data: CreateCourseDto, userId: string) {
    const courseData = {
      userId,
      title: data.title,
      contentType: data.contentType || 'premium',
      courseType: data.type || 'appsheet',
      kind: data.kind || 'course',
      basicDescription: data.basicDescription || '',
      prerequisites: data.prerequisites || [],
      detailedContent: data.detailedContent || '',
      imageUrl: data.imageUrl || '',
      modules: data.modules || [],
      status: 'in-progress',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      // Crear el curso
      const newCourse = new this.courseModel(courseData);
      await newCourse.save(); // Guardar el curso en la base de datos

      // Verificar si el usuario existe
      let user = await this.usersModel.findOne({ userId });

      if (!user) {
        // Si el usuario no existe, crear una nueva instancia
        user = new this.usersModel({
          userId,
          createdCourses: [newCourse._id],
          enrolledCourses: [],
          progress: [],
        });
      } else {
        // Si el usuario existe, agregar el curso a la lista de cursos creados
        user.createdCourses.push(newCourse.id);
      }

      await user.save(); // Guardar el usuario en la base de datos

      return newCourse; // Retornar el curso creado
    } catch (error) {
      throw new Error(`Error al crear el curso: ${error.message}`);
    }
  }
  // filtro
  async filterCourses(filters: Record<string, any>, page: number, limit: number) {
    const query = this.buildQuery(filters); // Supongamos que tienes una función para construir el filtro
    return this.courseModel.find(query)
      .skip((page - 1) * limit) // Implementación simple de paginación
      .limit(limit)
      .exec();
  }

  private buildQuery(filters: Record<string, any>) {
    let query = {};
    
    // Puedes construir una lógica más compleja dependiendo de los filtros
    if (filters.status) {
      query['status'] = filters.status;
    }
  
    if (filters.contentType) {
      query['contentType'] = filters.contentType;
    }
  
    if (filters.kind) {
      query['kind'] = filters.kind;
    }
    if (filters.level){
      query['level'] = filters.level
    }
    if (filters.platafor){
      query['platafor'] = filters.platafor
    }
    if (filters.idiom){
      query['idiom'] = filters.idiom
    }
    if (filters.pilar){
      query['pilar'] = filters.pilar
    }
    if (filters.funtionalidad){
      query['funtionalidad'] = filters.funtionalidad
    }
    if (filters.sector){
      query['sector']= filters.sector
    }
    if (filters.tool){
      query['tool']= filters.tool
    }
  
    // Aquí puedes agregar más filtros según las propiedades del curso
    
    return query;
  }

  // buscar curse por id
  async findById(id: string): Promise<Course | null> {
    return await this.courseModel.findById(id).exec();
  }
}