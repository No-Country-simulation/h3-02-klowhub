import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { publicRoutes } from './routersPublics'; // Importar las rutas públicas
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // Usamos una función de flecha para mantener el contexto de `this`
  use = (req: Request, res: Response, next: NextFunction) => {
    // Si la ruta actual es pública, omitimos la validación
    if (this.isPublicRoute(req.originalUrl)) {
      return next(); // Permitir acceso sin token
    }

    // Obtener el token de las cookies
    const token = req.cookies['auth_token'];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Decodificar el token JWT
      const payload = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
        role: string;
      };
      req['user'] = { id: payload.userId, role: payload.role }; // Adjuntar el usuario a la solicitud

      next(); // Continuar con la siguiente función
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  };

  // Verificar si la ruta es pública
  private isPublicRoute(url: string): boolean {
    return publicRoutes.some((route) => url.startsWith(route)); // Comparar la URL con las rutas públicas
  }
}
