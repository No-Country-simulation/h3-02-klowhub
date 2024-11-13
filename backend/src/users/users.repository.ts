import { Injectable } from '@nestjs/common';
import { User } from './users.interface';
type user = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  address?: string | undefined;
  city?: string | undefined;
};

@Injectable()
export class UsersRepository {
  getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const userList = this.users.slice(start, end);
    return userList.map(
      ({ password, ...userListNoPassword }) => userListNoPassword,
    );
  }

  getUsersById(id: number) {
    const foundIndex = this.users.findIndex((user) => user.id === id);
    if (foundIndex === -1) return 'nose encontro el indice';
    const { password, ...userNoPassword } = this.users[foundIndex];
    return userNoPassword;
  }

  createUsers(user: User) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    return this.users;
  }

  getUsersByIdByName(id: number, name: string) {
    return this.users.find((user) => user.id === id && user.name === name);
  }
  getUsersByName(name: string) {
    return this.users.find((user) => user.name === name);
  }

  getUsersByEmail(email: string) {
    const user = this.users.filter((user) => user.email === email);
    if (user.length === 1) {
      return user;
    }
  }

  private users: user[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Kulas Light Apt. 556',
      city: 'Gwenborough',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'finol@melissa.tv',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Victor Plains Suite 879',
      city: 'Wisokyburgh',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'orozco@gmail.com',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Victor Plains Suite 879',
      city: 'Wisokyburgh',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'fernandez@gmail.com',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Victor Plains Suite 879',
      city: 'Wisokyburgh',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'ebratt@gmail.com',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Victor Plains Suite 879',
      city: 'Wisokyburgh',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'quintero@gmail.com',
      password: '12345678',
      phone: '55555555555',
      country: 'nigeria',
      address: 'Victor Plains Suite 879',
      city: 'Wisokyburgh',
    },
  ];
}