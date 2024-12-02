import { z } from 'zod';
import { baseTitleSchema } from './common.schema';

export const courseCardSchema = baseTitleSchema.extend({
  type: z.string(),
  isFavorite: z.boolean(),
  price: z.string(),
  rating: z.number(),
  reviews: z.number(),
  platform: z.string(),
  tags: z.array(z.string()),
  img: z.string(),
});

export type CourseCardType = z.infer<typeof courseCardSchema>;
