import { z } from 'zod';

export const courseDetailsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  contentType: z.string(),
  kind: z.string(),
  basicDescription: z.string().optional(),
  platform: z.string(),
  idiom: z.string(),
  reviews: z.string(),
  rating: z.string(),
  pilar: z.string().optional(),
  funtionalidad: z.string().optional(),
  sector: z.string().optional(),
  tool: z.string().optional(),
  purpose: z.string().optional(),
  prerequisites: z.array(z.string()),
  followUp: z.array(z.string()),
  contents: z.array(z.string()),
  detailedContent: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.string(),
  enrolledUsers: z.array(z.string()),
});

export type CourseDetailsType = z.infer<typeof courseDetailsSchema>;
