import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigEnvs } from '../config/envs';

export function extractToken(authHeader: string, jwtService: JwtService): any {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token no proporcionado o formato inválido');
  }

  const token = authHeader.split(' ')[1]; // Extraer el token (después de "Bearer ")

  try {
    // Verificar el token usando el JwtService
    const payload = jwtService.verify(token, { secret: ConfigEnvs.JWT_SECRET });
    return payload;
  } catch (error) {
    throw new UnauthorizedException('Token inválido o expirado');
  }
}
