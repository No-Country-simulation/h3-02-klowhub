import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UsersService } from './users.interfaces';

@Controller("users")
export class UsersController  implements OnModuleInit {
  private userService: UsersService;

  constructor(
    @Inject('USER_SERVICE') private client: microservices.ClientGrpc, 
  ) {}
  
  onModuleInit() {
    this.userService = this.client.getService<UsersService>('UsersService');
  }
  
  @Get("hello")
  getHello(): Observable<{ message: string }> {
    return this.userService.GetHello({});
  }
}