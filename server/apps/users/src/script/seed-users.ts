import { Controller, Injectable, Logger, OnModuleInit, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from 'src/entities/UserRole';
import {hash, compare} from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    // Creamos los usuarios de prueba automáticamente al iniciar el módulo
    const users = [
      {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: [UserRole.ADMIN, UserRole.CREATOR, UserRole.MODER, UserRole.USER],
        isEmailVerified: true ,
      },
      {
        firstName: 'User',
        lastName: 'User',
        email: 'user@example.com',
        password: '@user123',
        role: [UserRole.USER, UserRole.CREATOR],
        isEmailVerified: true ,
        title: 'Creador de contenido',
        reviws: 10,
        whyLearn: 'Example',
        rating: 5
      },
      {
        firstName: 'Creator',
        lastName: 'Creator',
        email: 'creator@example.com',
        password: '@creator123',
        role: [UserRole.USER],
        isEmailVerified: true
      },
    ];

    for (const userData of users) {
      // Verifica si el usuario ya existe
      const existingUser = await this.usersService.findByEmail(userData.email);
      if (!existingUser) {
        // Crea el usuario con la contraseña cifrada
        await this.usersService.createUser({
          ...userData,
          password: await hash(userData.password, 10),
        });
        Logger.log(`Usuario creado: ${userData.email}`);
      } else {
        Logger.log(`El usuario ${userData.email} ya existe.`);
      }
    }
  }
}