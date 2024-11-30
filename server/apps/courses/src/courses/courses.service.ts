import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create.course.dto';
import { Users } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { CreateModuleDto } from './dto/create.module.dto';
import { CreateLessonDto } from './dto/create.lesson.dto';
import { Modules, ModulesSchema } from './schemas/module.schema';
import {Lesson } from './schemas/lesson.module.schema';
import { REQUEST } from '@nestjs/core'; 

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Users.name) private usersModel: Model<Users>,
    @InjectModel(Modules.name) private moduleModel: Model<Modules>,
    @InjectModel(Lesson.name) private lessonModel: Model<Lesson>,
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
    if (!userId) {
      console.log('userId is null')
    }
    const existingUser = await this.usersModel.findOne({ userId });

    if (!existingUser) {
      // Si no existe, crear un nuevo usuario
      const newUser = new this.usersModel({ userId });
      return await newUser.save(); // Guardar el usuario en la base de datos
    }

    // Si ya existe, retornamos el usuario encontrado
    return existingUser;
  }

  async createCourse(data: CreateCourseDto) {
    console.log('data entrando en el servicio', data)
    try {
      // Validar y decodificar el token
      const decodedToken = this.jwtService.verify(data.token); // Verifica y decodifica el token JWT
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error('El token no contiene un userId válido');
      }

      // Preparar los datos del curso
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
        status: 'in-progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Crear y guardar el curso
      const newCourse = await this.courseModel.create(courseData);

      // Verificar si el usuario ya existe en la base de datos
      const user = await this.usersModel.findOneAndUpdate(
        { userId }, // Buscar por userId
        {
          $setOnInsert: { // Solo establecer estos valores si el usuario no existe
            userId,
            enrolledCourses: [],
            progress: [],
          },
          $push: { createdCourses: newCourse._id }, // Agregar el curso al array de cursos creados
        },
        { upsert: true, new: true }, // Crear si no existe, devolver el documento actualizado
      );

      // Retornar el curso creado
      return newCourse;
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
    if (filters.level) {
      query['level'] = filters.level
    }
    if (filters.platafor) {
      query['platafor'] = filters.platafor
    }
    if (filters.idiom) {
      query['idiom'] = filters.idiom
    }
    if (filters.pilar) {
      query['pilar'] = filters.pilar
    }
    if (filters.funtionalidad) {
      query['funtionalidad'] = filters.funtionalidad
    }
    if (filters.sector) {
      query['sector'] = filters.sector
    }
    if (filters.tool) {
      query['tool'] = filters.tool
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
  // Obtener todos los cursos creados por un usuario específico
  async getCoursesByUser(userId: string) {
    try {
      const courses = await this.courseModel.find({ userId }).exec();
      return courses;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al obtener los cursos del usuario',
      });
    }
  }

  // Obtener un curso específico por ID
  async findCourseById(courseId: string, userId: string) {
    try {
      // Buscar el curso por ID, asegurándonos de que el usuario tenga acceso
      const course = await this.courseModel.findOne({ _id: courseId, userId }).exec();
      return course;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message || 'Error al obtener el curso',
      });
    }
  }
  // Método para agregar un módulo a un curso
  async addModule(valiData: CreateModuleDto) {
    try {
      // Decodificamos el token JWT
      const decoded = this.jwtService.verify(valiData.token);
      const userId = decoded.userId;
  
      // Verificamos que el courseId sea un ObjectId válido
      const courseId = new Types.ObjectId(valiData.courseId);
  
      // Intentamos encontrar el curso
      const course = await this.courseModel.findOne({
        _id: courseId,  // Aseguramos que el courseId sea un ObjectId
        userId: userId,  // Verificamos que el curso pertenezca al usuario
      });
  
      if (!course) {
        throw new NotFoundException('Course not found or access denied');
      }
  
      // Verificamos que no exista un módulo con el mismo nombre dentro del curso
      const moduleExists = await this.moduleModel.findOne({
        courseId: courseId,
        moduleTitle: valiData.moduleTitle, // El nombre del módulo debe ser único
      });
  
      if (!moduleExists) {
        return ('Module with this name already exists')
        throw new ConflictException('Module with this name already exists');
      }
  
      // Si todo es correcto, creamos el módulo
      const newModule = new this.moduleModel({
        ...valiData,
        courseId: courseId,
      });
  
      await newModule.save();
  
      if(moduleExists){
        return {
          message: 'Module added successfully',
          module: newModule,
        };
      }
    } catch (error) {
      throw error; // Si ocurre cualquier error, se vuelve a lanzar
    }
  }
}
