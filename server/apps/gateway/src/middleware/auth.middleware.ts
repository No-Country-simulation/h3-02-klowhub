import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigEnvs } from '../config/envs';
import { JwtService } from '@nestjs/jwt';
import { publicRoutes } from './routersPublics';
import { Logger } from '@nestjs/common';


export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    Logger.log(`Middleware ejecutado en: ${req.originalUrl}`);
    if (this.isPublicRoute(req.originalUrl)) {
      Logger.log('Ruta pública detectada:', req.originalUrl);
      return next();
    }

    Logger.log('Verificando estado del token', req);

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o formato inválido');
    }
    
    const token = authHeader.split(' ')[1];
    Logger.log('Token recibido:', token);

    try {
      const payload = this.jwtService.verify(token, { 
        secret: ConfigEnvs.JWT_SECRET 
      });
      req.user = {id:payload.userId}
      next();
    } catch (error) {
      Logger.error('Error al verificar el token:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private isPublicRoute(url: string): boolean {
    return publicRoutes.some((route) => url.startsWith(route));
  }
}
