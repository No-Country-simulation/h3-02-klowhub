import {
  UsePipes,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  ValidationPipe,
  ParseUUIDPipe,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDBService } from './usersDB.Services';

@Controller('users')
export class UsersController {
  constructor( 
  private readonly usersService: UsersService,
  private readonly usersDbService: UsersDBService,
){}

  @Get('/')
  getUsers(
    @Query('page', ParseIntPipe) page: string,
    @Query('limit', ParseIntPipe) limit: string,
  ) {
   
   const resultado=this.usersDbService.getUsers(Number(page), Number(limit));
   console.log(resultado);
    return resultado;
  }
}
