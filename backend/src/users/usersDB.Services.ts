import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';

@Injectable()
export class UsersDBService {
  constructor(
    // @InjectRepository(Users) private usersRepository:UsersRepository,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const users = await this.usersRepository.find();
    console.log(users)
    const start = (page - 1) * limit;
    const end = start + limit;
    const newUsers = users.slice(start, end);
    
    return newUsers.map(({ password, ...userNoPassword }) => userNoPassword);
    
  }

//  async createUsers(users: UsersDto) {
//     const hashedPassword = await bcrypt.hash(users.password, 10);
//     const newUser = await this.usersRepository.save(users);
//     const dbUsers = await this.usersRepository
//       .createQueryBuilder('user')
//       .select([
//         'user.id',
//         'user.name',
//         'user.email',
//         'user.phone',
//         'user.country',
//         'user.address',
//         'user.city',
//       ])
//       .where('user.id = :id', { id: newUser.id })
//       .getOne();
//     return dbUsers;
//   }

//   async getUsersById(id: any) {
   
//     const user: any = await this.usersRepository
//       .createQueryBuilder('user')
//       .select([
//         'user.id',
//         'user.name',
//         'user.email',
//         'user.phone',
//         'user.country',
//         'user.address',
//         'user.city',
//       ])
//       .leftJoinAndSelect('user.orders', 'order')
//       .where('user.id = :id', { id })
//       .getOne();
//     console.log(user);
//     if (!user) {
//       return `el id ${id} no existe en base de datos`;
//     }

//     return user;
//   }

//   async getUsersByEmail(email: string) {
//     return await this.usersRepository.findOneBy({ email });
//   }

//   async updateUsers(id: string, users: Users) {
//     await this.usersRepository.update(id, users);
//     const updaUsers = await this.usersRepository.findOneBy({ id });

//     const { password, ...noPassword } = updaUsers;
//     password.trimEnd()
//     return noPassword;
//   }

//   async deleteUsers(id: string) {
//     const user = await this.usersRepository.findOneBy({ id });
//     this.usersRepository.remove(user);
//     const { password, ...noPassword } = user;
//     password.trimEnd()
//     return noPassword;
//   }
}