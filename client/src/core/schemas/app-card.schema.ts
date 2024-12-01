import { z } from 'zod';

export const courseCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
  price: z.string(),
  rating: z.number(),
  reviews: z.number(),
  platform: z.string(),
  tags: z.array(z.string()),
  img: z.string(),
});

export type AppsCardType = z.infer<typeof courseCardSchema>;
