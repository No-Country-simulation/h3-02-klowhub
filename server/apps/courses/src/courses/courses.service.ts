import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { Users } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Users.name) private usersModel: Model<Users>,
    private jwtService: JwtService,
  ) { }


  async verifyJwt(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);  // Verifica el token
      return decoded;  // Retorna el payload si el token es válido
    } catch (error) {
      throw new Error('Token inválido o expirado');  // Si hay error, lanzamos una excepción
    }
  }

  // crear isntnacia de usuario de postgres a mongoddb 

  // Función para crear un usuario si no existe
  async createUserIfNotExists(userId: string): Promise<Users> {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersModel.findOne({ userId });

    if (!existingUser) {
      // Si no existe, crear un nuevo usuario
      const newUser = new this.usersModel({ userId });
      return await newUser.save(); // Guardar el usuario en la base de datos
    }

    // Si ya existe, retornamos el usuario encontrado
    return existingUser;
  }

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
    // Validar si el ID proporcionado es un ObjectId válido
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El ID proporcionado no es válido',
        error: 'Bad Request',
      });
    }
  
    // Buscar el curso por ID
    const course = await this.courseModel.findById(id).exec();
  
    // Si no se encuentra el curso
    if (!course) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Curso con ID ${id} no encontrado`,
        error: 'Not Found',
      });
    }
  
    return course;
  }
}