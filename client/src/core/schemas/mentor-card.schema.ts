import { z } from 'zod';

export const mentorsCardSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
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
