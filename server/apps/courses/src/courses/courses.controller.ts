import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller("courses")
export class CoursesController {
  @GrpcMethod('CoursesService', 'GetHello')
  public getHello(): { message: string } {
    return { message: 'Hello World!'};
  }
}
