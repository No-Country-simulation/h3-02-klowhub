import { z } from 'zod';

export const TokenSchema = z.object({
  token: z.string({ message: 'Token is requiere' }),
});

export type TokenDto = z.infer<typeof TokenSchema>;
