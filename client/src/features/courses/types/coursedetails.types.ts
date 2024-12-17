import { z } from 'zod';
import { idSchema, nameSchema } from '@core/schemas/common.schema';
//import { use } from 'react';

export const courseDetailsSchema = z.object({
  id: idSchema,
  name: nameSchema,
  creatorId: idSchema,
  platform: z.string(),
  creatorName: z.string(),
  courseIntro: z.string().optional(),
  coursePoster: z.string().optional(),
  isBuyCourse: z.boolean().optional(),
  price: z.string().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
  creatorAvatar: z.string().optional(),
  creatorHeader: z.string().optional(),
  courseLearnings: z.array(z.string()),
  courseAbout: z.string(),
  creatorDescription: z.string(),
  courseObjective: z.string(),
  courseRequirenments: z.array(z.string()),
  courseAdditions: z.array(z.string()),
  userId: z.string(),
});

export type CourseDetailsType = z.infer<typeof courseDetailsSchema>;
