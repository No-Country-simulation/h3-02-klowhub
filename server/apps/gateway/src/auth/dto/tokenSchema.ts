// tokenSchema.dto.ts
import { z } from 'zod';

// Creamos el schema con Zod
export const TokenSchema = z.object({
  token: z.string().nonempty('El token es obligatorio'),
});

export type TokenDto = z.infer<typeof TokenSchema>;
