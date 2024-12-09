import { z } from 'zod';
import { idSchema } from '@core/schemas/common.schema';

export const creatorCourseSchema = z.object({
  id: idSchema,
  name: z.string(),
  avatar: z.string(),
  header: z.string(),
  rating: z.number(),
  reviews: z.number(),
  courses: z.number(),
  students: z.number(),
  membership: z.string(),
  description: z.string(),
  whyLearning: z.string(),
});

export type CreatorCourseType = z.infer<typeof creatorCourseSchema>;
