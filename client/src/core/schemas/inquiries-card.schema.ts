import { z } from 'zod';
import { baseTitleSchema, nameSchema } from './common.schema';

export const inquiriesCardSchema = baseTitleSchema.extend({
  name: nameSchema,
  date: z.string().refine(value => !isNaN(Date.parse(value)), {
    message: 'Date must be in a valid ISO format (YYYY-MM-DD)',
  }),
  state: z.enum(['completed', 'pending', 'in-progress']),
  avatar: z.string().url(),
  platform: z.string(),
});

export type InquiriesCardType = z.infer<typeof inquiriesCardSchema>;
