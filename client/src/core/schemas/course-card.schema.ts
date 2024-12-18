import { z } from 'zod';
import { baseTitleSchema, idSchema } from './common.schema';

export const courseCardSchema = baseTitleSchema.extend({
  _id: idSchema.optional(),
  type: z.string(),
  isFavorite: z.boolean(),
  price: z.string(),
  basicDescription: z.string(),
  rating: z.number(),
  reviews: z.number(),
  platform: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string(),
});

export type CourseCardType = z.infer<typeof courseCardSchema>;
