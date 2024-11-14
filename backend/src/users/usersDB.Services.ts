import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
// import { UsersDto } from './users.dto';
// import * as bcrypt from 'bcrypt';


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


}