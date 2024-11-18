import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
// import { UsersDto } from './users.dto';
// import * as bcrypt from 'bcrypt';
import { Cursos } from 'src/cursos/entities/cursos.entity';


@Injectable()
export class UsersDBService {
  constructor(
     @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers() {
    const users = await this.usersRepository.find();
    console.log(users)    
    return users;    
  }

 async createUsers(users) {
    //const hashedPassword = await bcrypt.hash(users.password, 10);
    const newUser = await this.usersRepository.save(users);
   
     return newUser;
  }



  async getUsersById(id: any) {   
    const user:Users = await this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',      
      ])
      .leftJoinAndSelect('user.cursos', 'cursos')
      .where('user.id = :id', { id })
      .getOne();
    console.log(user);
    if (!user) {
      return `el id ${id} no existe en base de datos`;
    }

    return user;
  }


}