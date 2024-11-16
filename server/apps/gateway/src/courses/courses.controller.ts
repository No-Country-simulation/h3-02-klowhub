import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.interfaces';

@Controller("courses")
export class CoursesController implements OnModuleInit {
  private coursesService: CoursesService;

  constructor(
    @Inject('COURSE_SERVICE') private client: ClientGrpc, 
  ) {}
  
  onModuleInit() {
    this.coursesService = this.client.getService<CoursesService>('CoursesService');
  }
  
  @Get("hello")
  getHello(): Observable<{ message: string }> {
    return this.coursesService.GetHello({});
  }
}