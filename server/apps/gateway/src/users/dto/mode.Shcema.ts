import { z } from 'zod';

export const ModeSchema = z.object({
  mode: z.enum(['user', 'creator'], {
    message: 'Invalid mode. Must be either "user" or "creator".',
  }),
});

export type ModeDto = z.infer<typeof ModeSchema>;
