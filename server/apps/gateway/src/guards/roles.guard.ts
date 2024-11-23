import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    ); // Obtener roles necesarios de la ruta

    if (!requiredRoles) {
      return true; // Si no se especifican roles, permitir acceso
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request['user']; // Obtener los datos del usuario del middleware

    if (!user) {
      throw new ForbiddenException(
        'Acceso denegado, no se encontraron datos del usuario',
      );
    }

    // Verificar si el rol del usuario está permitido
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('Acceso denegado, rol insuficiente');
    }

    return true; // Permitir acceso si el rol es adecuado
  }
}
