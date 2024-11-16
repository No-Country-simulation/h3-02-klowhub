import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';
import { UsersServiceClientOptions } from './users-svc.options';
import { UsersService } from './users.interfaces';

@Controller("users")
export class UsersController implements OnModuleInit{
  @Client(UsersServiceClientOptions)
  private client: ClientGrpc;

  private usersService: UsersService;

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }
  @Get("hello")
  getHello(): Observable<{ message: string }> {
    return this.usersService.GetHello({});
  }
}