import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CoursesService } from './courses.service';
import { AuthorizationToken } from 'src/utils/authorization';
import { CreateCourseDto, createCourseSchema } from './dto/create.course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService : CoursesService,
    private readonly jwtService: JwtService
  ) { }

  @Get('test')
    async test(@Body() any:any): Promise<any> {
      return this.coursesService.test(any)
    }

    @Post('create')
    async createCourse(@Body() courseData: CreateCourseDto, @Request() req: any, @Response() res: any) {
      try {
        const token = AuthorizationToken(req) as string;
        if (typeof token === 'object') {
          return res.status(401).json({ message: 'Token inválido', error: token });
        }
  
        const data = { token, ...courseData };
        const validationResult = createCourseSchema.safeParse(data);
        if (!validationResult.success) {
          return res.status(400).json({
            message: 'Errores de validación',
            errors: validationResult.error.errors.map(
              (err) => `${err.path.join('.')}: ${err.message}`
            ),
          });
        }
  
        const sanitizedData = validationResult.data;
  
        const result = await this.coursesService.createCourse(sanitizedData);
  
        if (result && result.success) {
          return res.status(201).json({
            message: 'Curso creado exitosamente',
            courseId: result.courseId,
            courseTitle: result.courseTitle,
          });
        } else {
          return res.status(500).json({ message: 'Error al crear el curso', error: result });
        }
      } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
      }
    }
    @Get('getCourses')
    async getCourses(@Body() any: any) {
      return this.coursesService.getCourses(any)
    }
}

  //   }
  //   const sanitizedData = validationResult.data
  //   // Envía los datos validados al microservicio
  //   const result = await lastValueFrom(
  //     this.coursesClient.send({ cmd: 'create_course' }, sanitizedData)
  //   );
  //   // Retorna el mensaje de éxito con el resultado
  //   if (result.error) {
  //     return {
  //       message: 'Error in created Course'
  //     }
  //   }
  //   return {
  //     message: 'Course created successfully',
  //     data: result,
  //   };
  // }
  // //buscar curso por filtro
  // @Get('filter')
  // async filterCourses(
  //   @Query('page') page: string = '1',
  //   @Query('limit') limit: string = '10',
  //   @Query() filters: Record<string, any>,
  // ) {
  //   // Validación de parámetros de paginación
  //   const pageNum = parseInt(page, 10);
  //   const limitNum = parseInt(limit, 10);

  //   if (isNaN(pageNum) || pageNum <= 0) {
  //     throw new BadRequestException('El parámetro "page" debe ser un número positivo');
  //   }

  //   if (isNaN(limitNum) || limitNum <= 0) {
  //     throw new BadRequestException('El parámetro "limit" debe ser un número positivo');
  //   }

  //   // Pasamos los filtros y parámetros al microservicio para obtener los cursos
  //   try {
  //     return await this.coursesClient.send({ cmd: 'filter_courses' }, { filters, page: pageNum, limit: limitNum });
  //   } catch (error) {
  //     throw new BadRequestException('Error al filtrar los cursos');
  //   }
  // }
  // // Obtener todos los cursos de un usuario
  // @Get('mycourses')
  // async getCoursesByUser(@Req() req: any) {
  //   const token = req.cookies.auth_token;

  //   if (!token) {
  //     throw new Error('Token JWT no encontrado en las cookies');
  //   }

  //   // Enviar el token al microservicio para obtener los cursos del usuario
  //   return this.coursesClient.send(
  //     { cmd: 'mycourses' },
  //     { token }
  //   );
  // }

  // // Obtener un curso específico por ID
  // @Get('course/:id')
  // async getCourseById(@Req() request: Request, @Request() req: any) {
  //   const token = req.cookies.auth_token;
  //   const courseId = req.params.id;

  //   if (!token) {
  //     throw new Error('Token JWT no encontrado en las cookies');
  //   }

  //   // Enviar el token y el ID del curso al microservicio
  //   return this.coursesClient.send(
  //     { cmd: 'course' },
  //     { token, courseId }
  //   );
  // }
  // // agregar un modulo a un curso
  // @Post('course/:id')
  // async addModuleCourse(@Req() request: Request, @Request() req: any, @Body() moduleData: CreateModuleDto) {
  //   const token = req.cookies.auth_token;
  //   const courseId = req.params.id;
  //   if (!token) {
  //     throw new Error('Token JWT no encontrado en las cookies');
  //   }
  //   const data = { token, courseId, ...moduleData }
  //   const validationResult = createModuleSchema.safeParse(data);

  //   if (!validationResult.success) {
  //     return (validationResult.error)
  //   }
  //   const sanitizedData = validationResult.data
  //   const result = await lastValueFrom(
  //     this.coursesClient.send(
  //       { cmd: 'addModule' },
  //       sanitizedData
  //     )
  //   );
  //   return {
  //     data: result,
  //   }
  // }

  // // agregar lesson a course 
  // @Post('lesson/:id')
  // async addLessonToModule(@Req() request: Request, @Request() req: any, @Body() LessonDto: CreateLessonDto) {
  //   const token = req.cookies.auth_token;
  //   const moduleId = req.params.id;

  //   if (!token) {
  //     throw new Error('Token JWT no encontrado en las cookies');
  //   }

  //   const data = { token, moduleId, ...LessonDto }
  //   // Validar los datos de la lección con Zod
  //   const validationResult = createLessonSchema.safeParse(data);

  //   if (!validationResult.success) {
  //     return {
  //       error: validationResult.error,
  //     };
  //   }
  //   const sanitizedData = validationResult.data;
  //   const result = await lastValueFrom(
  //     this.coursesClient.send({ cmd: 'add-lesson' }, sanitizedData),
  //   );
  //   console.log('esto es la respuesta del backend', result)
  //   return {
  //     data: result,
  //   };
  // }