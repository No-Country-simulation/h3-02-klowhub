import { z } from 'zod';
import { idSchema } from '@core/schemas/common.schema';
//import { use } from 'react';

export const creatorCourseSchema = z.object({
  id: idSchema,
  firstName: z.string(),
  email: z.string(),
  image: z.string(),
  title: z.string(),
  rating: z.number(),
  reviews: z.number(),
  courses: z.number(),
  students: z.number(),
  membership: z.string(),
  biograophy: z.string(),
  whyLeam: z.string(),
});

export type CreatorCourseType = z.infer<typeof creatorCourseSchema>;
