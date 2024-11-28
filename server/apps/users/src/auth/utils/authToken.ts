import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // otros servicios e inyecciones...
  ) {}

  // Función para generar un token JWT de verificación
  generateVerificationToken(userId: string, email: string): string {
    return this.jwtService.sign({ userId, email }, {
      expiresIn: '1h', // Expiración de 1 hora
    });
  }
  // Verificar email
  async verifyEmailToken(
    token: string,
    userRepository: Repository<UserEntity>,
  ): Promise<void> {
    try {
      // Verificar y decodificar el token JWT usando JwtService
      const decoded: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET, // Se puede configurar el secreto aquí si es necesario
      });
  
      const user = await userRepository.findOne({
        where: { id: decoded.userId, email: decoded.email },
      });
  
      if (!user) {
        throw new BadRequestException('User not found');
      }
  
      const currentTime = new Date();
      if (user.emailVerificationExpiresAt < currentTime) {
        throw new BadRequestException('Token has expired');
      }
  
      user.emailVerificationExpiresAt = new Date();
      user.verificationToken = null; // Limpiar el token de verificación después de usarlo
      await userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
  // generarResentToken
  generateResetToken(userId: string, email: string): string {
    return this.jwtService.sign({ userId, email }, {
      expiresIn: '1h', // Expiración de 1 hora
    });
  }
}
// codigo viejo
// Función para generar un token JWT de verificación
// export const generateVerificationToken = (
//   userId: string,
//   email: string,
// ): string => {
//   return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
// };

// export const verifyEmailToken = async (
//   token: string,
//   userRepository: Repository<UserEntity>,
// ): Promise<void> => {
//   try {
//     // Verificar y decodificar el token JWT
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await userRepository.findOne({
//       where: { id: decoded.userId, email: decoded.email },
//     });

//     if (!user) {
//       throw new BadRequestException('User not found');
//     }

//     const currentTime = new Date();
//     if (user.emailVerificationExpiresAt < currentTime) {
//       throw new BadRequestException('Token has expired');
//     }

//     user.emailVerificationExpiresAt = new Date();
//     user.verificationToken = null; // Limpiar el token de verificación después de usarlo
//     await userRepository.save(user);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     throw new BadRequestException('Invalid or expired token');
//   }
// };

// export function generateResetToken(userId: string, email: string): string {
//   if (!process.env.JWT_SECRET) {
//     throw new Error('JWT_SECRET is not defined in environment variables');
//   }
//   return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
//     expiresIn: '1h',
//   });
// }
