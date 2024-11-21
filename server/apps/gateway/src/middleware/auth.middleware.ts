import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Reflector } from '@nestjs/core';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.auth_token; // Verificar si el token está en las cookies
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Verificar y decodificar el token
      const payload = jwt.verify(token, process.env.JWT_SECRET) as unknown as {
        role: string;
        sub: string;
      };
      req['user'] = { id: payload.sub, role: payload.role }; // Adjuntar usuario y rol al request

      // Obtener los roles permitidos desde los metadatos
      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        req.route?.path,
      );

      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        // Si el rol no está permitido, lanzar ForbiddenException
        throw new ForbiddenException(
          'No tienes permiso para acceder a esta ruta',
        );
      }

      next(); // Pasar al siguiente middleware o controlador
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
