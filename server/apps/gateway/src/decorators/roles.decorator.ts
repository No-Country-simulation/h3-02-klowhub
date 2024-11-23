import { SetMetadata } from '@nestjs/common';

// Crear un decorador para asignar roles a las rutas
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
