import {  
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import { UsersDBService } from './usersDB.Services';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor( 
  private readonly usersDbService: UsersDBService,
){}

  @Get()
  async getUsers() {   
   const resultado= await this.usersDbService.getUsers();
   console.log(resultado);
    return resultado;
  }

  @Get(':id')
  getUsersById(@Param('id', ParseUUIDPipe) id: string) {
   
    try {
      const user = this.usersDbService.getUsersById(id);
      return user;
    } catch (error) {
      throw new HttpException(
        `error ${error} controlado y no exploto el server`,
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  @Post()
  async createUsers( @Body() users: UsersDto ){
    return this.usersDbService.createUsers(users);
  }
}
