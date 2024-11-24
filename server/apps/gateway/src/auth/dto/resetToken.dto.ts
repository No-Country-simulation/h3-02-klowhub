import { z } from 'zod';

export const ResetTokenSchema = z.object({
  email: z
    .string()
    .email({ message: 'The email must be valid.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),
});

export type ResetTokenDto = z.infer<typeof ResetTokenSchema>;
