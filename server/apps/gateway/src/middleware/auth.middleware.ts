import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { JwtService } from '@nestjs/jwt';  // Asegúrate de que JwtService está siendo inyectado correctamente
import { publicRoutes } from './routersPublics'; // Importar las rutas públicas (deberías definirlas)
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  // Método que define el comportamiento del middleware
  use(req: Request, res: Response, next: NextFunction) {
    // Si la ruta actual es pública, omitimos la validación
    if (this.isPublicRoute(req.originalUrl)) {
      return next(); // Permitir acceso sin token
    }

    // Obtener el token de las cookies
    const token = req.body?.headers?.cookie?.split?.('=')?.[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Decodificar el token JWT usando el secret almacenado en el archivo .env
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      req['user'] = { id: payload.userId, role: payload.role };  // Adjuntar el usuario a la solicitud

      next(); // Continuar con la siguiente función
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  // Método para verificar si la ruta es pública
  private isPublicRoute(url: string): boolean {
    return publicRoutes.some((route) => url.startsWith(route)); // Comparar la URL con las rutas públicas
  }
}
