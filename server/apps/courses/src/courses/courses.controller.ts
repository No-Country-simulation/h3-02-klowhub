import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class CoursesController {

  @GrpcMethod('CoursesService', 'GetHello')
  public getHello(): string {
      return 'Hello World!';
  }
}
