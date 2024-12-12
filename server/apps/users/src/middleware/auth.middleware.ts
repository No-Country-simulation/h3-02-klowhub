import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { publicRoutes } from './routersPublics';
import { ConfigEnvs } from '../config/envs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.isPublicRoute(req.originalUrl)) {
      return next();
    }
    const token = req.body?.headers?.cookie?.split?.('=')?.[1];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    try {
      const payload = this.jwtService.verify(token, { secret: ConfigEnvs.JWT_SECRET });
      req['user'] = { id: payload.userId, role: payload.role };
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
  private isPublicRoute(url: string): boolean {
    return publicRoutes.some((route) => url.startsWith(route));
  }
}
