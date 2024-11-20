// src/dto/register.dto.ts
import { z } from 'zod';

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long.' })
    .max(50, { message: 'First name cannot exceed 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message: 'First name can only contain letters and spaces.',
    }),
  email: z
    .string()
    .email({ message: 'The email must be valid.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .max(64, { message: 'Password cannot exceed 64 characters.' })
    .regex(/[A-Z]/, {
      message: 'Password must include at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must include at least one lowercase letter.',
    })
    .regex(/\d/, { message: 'Password must include at least one number.' })
    .regex(/[@$!%*?&#]/, {
      message:
        'Password must include at least one special character (@, $, !, %, *, ?, &, #).',
    }),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;