import { Request } from '@nestjs/common';

/**
 * Función para extraer y validar el token del encabezado de la solicitud.
 * @param req - Objeto de solicitud.
 * @returns El token extraído o un mensaje de error si no se encuentra el token.
 */
export function AuthorizationToken(req: Request): string | { message: string } {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return { message: 'Authorization header missing' };
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return { message: 'Token missing from Authorization header' };
  }

  return token;
}
