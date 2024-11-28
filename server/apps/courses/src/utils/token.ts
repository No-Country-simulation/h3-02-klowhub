import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Método para verificar el token
  decodeToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token); // Usamos verify de JwtService
      return decoded;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}
