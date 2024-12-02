import { z } from 'zod';
import { baseTitleSchema } from './common.schema';

export const courseCardSchema = baseTitleSchema.extend({
  isFavorite: z.boolean(),
  price: z.string(),
  rating: z.number(),
  reviews: z.number(),
  platform: z.string(),
  tags: z.array(z.string()),
  img: z.string(),
});

export type AppsCardType = z.infer<typeof courseCardSchema>;
