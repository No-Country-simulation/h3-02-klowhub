import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from './schemas/course.schema';
import { Lesson } from './schemas/lesson.module.schema';
import { CreateCourseDto } from './dto/create.course.dto';
import { Users } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { Modules, ModulesSchema } from './schemas/module.schema';
import { FilterCoursesSuccess } from 'src/types/responseTypes';


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
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  async createUserIfNotExists(userId: string): Promise<Users> {
    if (!userId) {
      Logger.log('userId is null')
    }
    const existingUser = await this.usersModel.findOne({ userId });

    if (!existingUser) {
      const newUser = new this.usersModel({ userId });
      return await newUser.save();
    }
    return existingUser;
  }

  async createCourse(data: CreateCourseDto) {
    try {
      const decodedToken = this.jwtService.verify(data.token);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error('El token no contiene un userId válido');
      }
      const courseData = {
        userId,
        title: data.title,
        platform: data.platform || 'none',
        contentType: data.contentType || 'premium',
        courseType: data.type || 'nonet',
        kind: data.kind || 'course',
        purpose: data.purpose || '',
        contents: data.contents || [],
        basicDescription: data.basicDescription || '',
        prerequisites: data.prerequisites || [],
        followUp: data.followUP || [],
        detailedContent: data.detailedContent || '',
        imageUrl: data.imageUrl || '',
        status: 'in-progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newCourse = await this.courseModel.create(courseData);

      await this.usersModel.updateOne(
        { userId },
        {
          $push: { createdCourses: newCourse._id },
        }
      );
      if (!newCourse) {
        throw new Error('Failed to create course');
      }
      return {
        success: true,
        message: 'Course created successfully',
        courseId: newCourse._id,
        courseTitle: newCourse.title,
      }
    } catch (error) {
      Logger.error('Error creating course', error.message)
      throw new Error(`Error creating course: ${error.message}`);
    }
  }


  // filtro
  // private cleanFilters(filters: Record<string, any>): Record<string, any> {
  //   const cleaned = {};
  //   for (const key in filters) {
  //     if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
  //       cleaned[key] = filters[key];
  //     }
  //   }
  //   return cleaned;
  // }
  // // funcion principal del filtro depende de otras funciones
  // async filterCourses(
  //   filters: Record<string, any>,
  //   page: number,
  //   limit: number):
  //   Promise<FilterCoursesSuccess> {
  //   const cleanFilters = this.cleanFilters(filters);
  //   const query = this.buildQuery(cleanFilters);
  //   const courses = await this.courseModel
  //     .find(query)
  //     .skip((page - 1) * limit)
  //     .limit(limit)
  //     .exec();
  //   const total = await this.courseModel.countDocuments(query);
  //   Logger.log('Courses Found', courses);
  //   if (!courses || courses.length === 0) {
  //     throw new Error('No courses found with the provided filters');
  //   }
  //   const mappedCourses: Course[] = courses.map(course => ({
  //     id: course._id.toString(), // Convierte ObjectId a string
  //     userId: course.userId,
  //     title: course.title,
  //     contentType: course.contentType,
  //     kind: course.kind,
  //     basicDescription: course.basicDescription || '',
  //     platform: course.platform,
  //     idiom: course.idiom,
  //     reviews: course.reviews,
  //     rating: course.rating,
  //     pilar: course.pilar || '',
  //     funcionalidad: course.funcionalidad || '', // Ajuste del nombre correcto
  //     sector: course.sector || '',
  //     tool: course.tool || '',
  //     purpose: course.purpose || '',
  //     prerequisites: course.prerequisites || [],
  //     followUp: course.followUp || [],
  //     contents: course.contents || [],
  //     detailedContent: course.detailedContent || '',
  //     imageUrl: course.imageUrl || '',
  //     status: course.status,
  //     enrolledUsers: course.enrolledUsers || [],
  //     createdAt: course.createdAt,
  //     updatedAt: course.updatedAt,
  //     modules: course.modules || [],
  //     __v: course.__v || 0,
  //   }));

  //   return {
  //     success: true,
  //     message: 'Courses fetched successfully',
  //     courses: mappedCourses,
  //     pagination: {
  //       page,
  //       limit,
  //       total,
  //     },
  //   };
  // }

  // private buildQuery(filters: Record<string, any>) {
  //   const query: Record<string, any> = {};
  
  //   if (filters.status) query['status'] = filters.status;
  //   if (filters.contentType) query['contentType'] = filters.contentType;
  //   if (filters.kind) query['kind'] = filters.kind;
  //   if (filters.level) query['level'] = filters.level;
  //   if (filters.platform) query['platform'] = filters.platform; // Ajuste en el nombre
  //   if (filters.idiom) query['idiom'] = filters.idiom;
  //   if (filters.pilar) query['pilar'] = filters.pilar;
  //   if (filters.funcionalidad) query['funcionalidad'] = filters.funcionalidad; // Ajuste en el nombre
  //   if (filters.sector) query['sector'] = filters.sector;
  //   if (filters.tool) query['tool'] = filters.tool;
  
  //   Logger.log('Query:', query);
  //   return query;
  }

  // // buscar curse por id
  // async findById(id: string): Promise<Course | null> {
  //   // Validar si el ID proporcionado es un ObjectId válido
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new BadRequestException({
  //       statusCode: 400,
  //       message: 'El ID proporcionado no es válido',
  //       error: 'Bad Request',
  //     });
  //   }

  //   // Buscar el curso por ID
  //   const course = await this.courseModel.findById(id).exec();

  //   // Si no se encuentra el curso
  //   if (!course) {
  //     throw new NotFoundException({
  //       statusCode: 404,
  //       message: `Curso con ID ${id} no encontrado`,
  //       error: 'Not Found',
  //     });
  //   }

  //   return course;
  // }
  // // Obtener todos los cursos creados por un usuario específico
  // async getCoursesByUser(userId: string) {
  //   try {
  //     const courses = await this.courseModel.find({ userId }).exec();
  //     return courses;
  //   } catch (error) {
  //     throw new RpcException({
  //       statusCode: 500,
  //       message: error.message || 'Error al obtener los cursos del usuario',
  //     });
  //   }
  // }

  // // Obtener un curso específico por ID
  // async findCourseById(courseId: string, userId: string) {
  //   try {
  //     // Buscar el curso por ID, asegurándonos de que el usuario tenga acceso
  //     const course = await this.courseModel.findOne({ _id: courseId, userId }).exec();
  //     return course;
  //   } catch (error) {
  //     throw new RpcException({
  //       statusCode: 500,
  //       message: error.message || 'Error al obtener el curso',
  //     });
  //   }
  // }
  // // Método para agregar un módulo a un curso
  // async addModule(valiData: CreateModuleDto) {
  //   try {
  //     // Decodificamos el token JWT
  //     const decoded = this.jwtService.verify(valiData.token);
  //     const userId = decoded.userId;

  //     // Verificamos que el courseId sea un ObjectId válido
  //     const courseId = new Types.ObjectId(valiData.courseId);

  //     // Intentamos encontrar el curso
  //     const course = await this.courseModel.findOne({
  //       _id: courseId,  // Aseguramos que el courseId sea un ObjectId
  //       userId: userId,  // Aseguramos que el curso pertenezca al usuario
  //     });

  //     // Si no se encuentra el curso, lanzamos un error
  //     if (!course) {
  //       throw new NotFoundException('Course not found or access denied');
  //     }

  //     // Verificamos si ya existe un módulo con el mismo nombre
  //     const existingModule = course.modules.find(
  //       (module) => module.moduleTitle === valiData.moduleTitle
  //     );

  //     if (existingModule) {
  //       // Si el módulo ya existe, lanzamos un error de conflicto
  //       throw new ConflictException('Module with this name already exists');
  //     }

  //     // Crear el nuevo módulo
  //     const newModule = {
  //       _id: new Types.ObjectId(),
  //       moduleTitle: valiData.moduleTitle,
  //       moduleDescription: valiData.moduleDescription,
  //     };

  //     // Agregamos el nuevo módulo al array de módulos del curso
  //     course.modules.push(newModule);
  //     await course.save();

  //     // Retornamos el nuevo módulo
  //     return newModule;
  //   } catch (error) {
  //     Logger.error(error);  // Imprimir el error para fines de depuración
  //     throw new NotFoundException('Error decoding JWT or adding module');
  //   }
  // }

  // // add lesson 
  // // Método para agregar una lección a un módulo
  // async addLessonToModule(valiData: CreateLessonDto) {
  //   try {
  //     // Decodificar el token JWT para obtener el userId
  //     let userId: string;
  //     try {
  //       const decoded = this.jwtService.verify(valiData.token);
  //       userId = decoded.userId;
  //     } catch (error) {
  //       return { message: 'Token inválido o expirado', error: error.message };
  //     }

  //     // Buscar el curso que contiene el módulo específico asociado al userId
  //     const course = await this.courseModel.findOne({
  //       userId: userId,
  //       modules: {
  //         $elemMatch: {
  //           _id: new Types.ObjectId(valiData.moduleId),
  //         },
  //       }
  //     });

  //     // Si no encontramos el curso o módulo
  //     if (!course) {
  //       return { message: 'Módulo no encontrado o acceso denegado' };
  //     }

  //     // Extraer el módulo
  //     const module = course.modules.find(
  //       (mod) => mod._id?.toString() === valiData.moduleId
  //     );

  //     if (!module) {
  //       return { message: 'Módulo no encontrado en el curso o datos inconsistentes' };
  //     }

  //     // Crear la nueva lección
  //     const newLesson = {
  //       _id: new Types.ObjectId(), // Genera un nuevo ID
  //       lessonTitle: valiData.lessonTitle,
  //       lessonDescription: valiData.lessonDescription,
  //       materialUrl: valiData.materialUrl || null,
  //       uploadedMaterial: valiData.uploadedMaterial || null,
  //       videoUrl: valiData.videoUrl || null,
  //     };

  //     // Agregar la lección al módulo
  //     module.lessons.push(newLesson);

  //     // Guardar el curso actualizado
  //     try {
  //       await course.save();
  //     } catch (saveError) {
  //       return { message: 'Error al guardar el curso', error: saveError.message };
  //     }

  //     // Retornar la lección creada
  //     return {
  //       message: 'Lección creada con éxito',
  //       lesson: newLesson,
  //     };
  //   } catch (error) {
  //     Logger.error(error);
  //     return { message: 'Error al agregar la lección', error: error.message };
  //   }
  // }
