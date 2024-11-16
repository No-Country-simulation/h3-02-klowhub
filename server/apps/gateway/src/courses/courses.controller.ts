import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CoursesService } from './courses.interfaces';
import { CoursesServiceClientOptions } from './courses-svc.options';

@Controller("courses")
export class CoursesController implements OnModuleInit {
  @Client(CoursesServiceClientOptions)
  private client: ClientGrpc;

  private coursesService: CoursesService;

  onModuleInit() {
    this.coursesService = this.client.getService<CoursesService>('CoursesService');
  }
  @Get("hello")
  getHello(): Observable<{ message: string }> {
    return this.coursesService.GetHello({});
  }
}