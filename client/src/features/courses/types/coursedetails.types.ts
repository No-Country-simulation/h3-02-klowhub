import { z } from 'zod';

export const courseDetailsSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  creatorId: z.string().or(z.number()),
  creatorName: z.string(),
  creatorAvatar: z.string().optional(),
  creatorHeader: z.string().optional(),
  courseLearnings: z.array(z.string()),
  courseAbout: z.string(),
  creatorDescription: z.string(),
  courseObjective: z.string(),
  courseRequirenments: z.array(z.string()),
  courseAdditions: z.array(z.string()),
});

export type CourseDetailsType = z.infer<typeof courseDetailsSchema>;
