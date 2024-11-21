import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['auth_token']; // Obtener el token de las cookies

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Decodificar el token JWT sin consultar la base de datos
      const payload = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: string;
        role: string;
      };
      req['user'] = { id: payload.userId, role: payload.role }; // Almacenar el usuario y su rol en la solicitud

      next(); // Continuar con la siguiente función
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
