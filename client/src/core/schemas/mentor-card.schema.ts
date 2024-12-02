import { z } from 'zod';
import { baseNameSchema } from './common.schema';

export const mentorsCardSchema = baseNameSchema.extend({
  price: z.string(),
  language: z.string(),
  country: z.string(),
  isFavorite: z.boolean(),
  sessions: z.number(),
  reviews: z.number(),
  platform: z.string(),
  img: z.string(),
});

export type MentorsCardType = z.infer<typeof mentorsCardSchema>;
