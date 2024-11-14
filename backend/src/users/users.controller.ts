import {  
  Body,
  Controller,
  Post,
  Get,
  // Delete,
  
  // Param,
   
  // Query,


 
 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDBService } from './usersDB.Services';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor( 
  private readonly usersService: UsersService,
  private readonly usersDbService: UsersDBService,
){}

  @Get()
  getUsers() {   
   const resultado=this.usersDbService.getUsers();
   console.log(resultado);
    return resultado;
  }

  @Post()
  async createUsers( @Body() users: UsersDto ){
    return this.usersDbService.createUsers(users);
  }
}
