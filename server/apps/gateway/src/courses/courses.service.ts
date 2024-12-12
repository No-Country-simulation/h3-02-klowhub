import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigEnvs } from "src/config/envs";

@Injectable()
export class CoursesService {
    private readonly coursesServiceUrl = `${ConfigEnvs.COURSES_MICROSERVICE_HOST}:${ConfigEnvs.COURSES_MICROSERVICE_PORT}`;
    constructor(private readonly httpService: HttpService) { }
    // test
    async test(any: any): Promise<any> {
        try {
            const response = await this.httpService
            .get(`${this.coursesServiceUrl}/courses/test`)
            .toPromise();
            return response.data;
        }catch(error){
            console.log(error.message);
            return 'Error al conectarse al Microservicio Courses';
        }
    }
}