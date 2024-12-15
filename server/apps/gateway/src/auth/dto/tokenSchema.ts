// tokenSchema.dto.ts
import { z } from 'zod';

// Creamos el schema con Zod
export const TokenSchema = z.object({
  token: z
    .string()
    .nonempty('El token no puede estar vacío')
    .refine(
      (val) => val.startsWith('Bearer '),
      'El token debe comenzar con "Bearer "',
    )
    .transform((val) => val.replace('Bearer ', '').trim()), // Extrae solo el token
});


export type TokenDto = z.infer<typeof TokenSchema>;
