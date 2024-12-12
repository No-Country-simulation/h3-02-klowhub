import * as dotenv from 'dotenv';
import {env} from 'process';
dotenv.config();

export class ConfigEnvs {
    static NODE_ENV = process.env.NODE_ENV;
    static JWT_SECRET = process.env.JWT_SECRET;
    static MONGO_URI = process.env.MONGO_URI;
    static COURSES_MICROSERVICE_HOST = process.env.COURSES_MICROSERVICE_HOST;
    static COURSES_MICROSERVICE_PORT = process.env.COURSES_MICROSERVICE_PORT;
}

console.log('Variables de entorno microservicio courses', env);