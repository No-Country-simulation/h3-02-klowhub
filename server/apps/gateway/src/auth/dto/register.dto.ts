// src/dto/register.dto.ts
import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({ message: 'El email debe ser válido.' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;
