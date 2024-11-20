import { z } from 'zod';

export const LoginSchema = z.object({
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

export type LoginDto = z.infer<typeof LoginSchema>;
