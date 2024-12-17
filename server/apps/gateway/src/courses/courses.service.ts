import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigEnvs } from "src/config/envs";
import { CreateCourseDto } from "./dto/create.course.dto";
import { firstValueFrom, lastValueFrom } from "rxjs";

@Injectable()
export class CoursesService {
    private readonly coursesServiceUrl = `${ConfigEnvs.COURSES_MICROSERVICE_URL}`;
    constructor(private readonly httpService: HttpService) { }
    // test
    async test(any: any): Promise<any> {
        try {
            const response = await this.httpService
                .get(`${this.coursesServiceUrl}/courses/test`)
                .toPromise();
            return response.data;
        } catch (error) {
            console.log(error.message);
            return 'Error al conectarse al Microservicio Courses';
        }
    }
    //create course
    async createCourse(sanitizedData: CreateCourseDto): Promise<any> {
        try {
            const token = sanitizedData.token
            const response = await this.httpService
                .post(`${this.coursesServiceUrl}/courses/create`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        sanitizedData
                    }
                })
                .toPromise();
            return response.data;
        } catch (error) {
            Logger.log(error.message)
            return 'Error al crear Curso'
        }
    }

    async getCourses(any: any) {
        try {
            const response = await this.httpService
                .get(`${this.coursesServiceUrl}/courses/getCourses`)
                .toPromise();
            return response.data;
        } catch (error) {
            Logger.log(error.message)
            return 'Error al obtener Cursos'
        }
    }

    async CoursesById(id:any) {
        try {
            const response = await this.httpService
            .get(`${this.coursesServiceUrl}/courses/course/${id}`)
            .toPromise();
            return response.data;
        } catch (error) {
            Logger.error(`Error fetching course with ID ${id}`, error.response?.data || error.message);
            throw new Error('Failed to fetch course from microservice');
        }
    }
}
