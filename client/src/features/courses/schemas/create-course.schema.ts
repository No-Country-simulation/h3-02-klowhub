import { z } from 'zod';
import { idSchema } from '@core/schemas/common.schema';
import {
  CourseCompetence,
  CourseMonetizable,
  CoursePlatform,
  CourseType,
} from '../models/enums/createCourseEnums';

export const createCourseSchema = z.object({
  courseTitle: idSchema.optional(),
  courseMonetizable: z.enum([CourseMonetizable.FREE, CourseMonetizable.PAYMENT]),
  courseType: z.enum([CourseType.LESSON, CourseType.COURSE]),
  courseDescription: z.string(),
  courseCompetence: z.enum([CourseCompetence.BASIC, CourseCompetence.INTERMEDIATE]),
  coursePlatform: z.enum([CoursePlatform.POWER_APPS, CoursePlatform.APP_SHEET]),
  courseLanguage: z.enum(['es', 'en']),
});

export type CreateCourseType = z.infer<typeof createCourseSchema>;
