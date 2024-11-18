import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.interfaces';

@Controller("courses")
export class CoursesController implements OnModuleInit {
  private coursesService: CoursesService;

  constructor(
    @Inject('COURSE_SERVICE') private client: microservices.ClientGrpc, 
  ) {}
  
  onModuleInit() {
    this.coursesService = this.client.getService<CoursesService>('CoursesService');
  }
  
  @Get("hello")
  getHello(): Observable<{ message: string }> {
    return this.coursesService.GetHello({});
  }
}