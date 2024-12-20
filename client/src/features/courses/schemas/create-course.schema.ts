import { z } from 'zod';
import { idSchema } from '@core/schemas/common.schema';
import {
  CourseCompetence,
  CourseMonetizable,
  CoursePlatform,
  CourseType,
} from '../models/enums/createCourse.enum';

export const createCourseSchema = z.object({
  courseTitle: idSchema.optional(),
  courseMonetizable: z.enum([CourseMonetizable.FREE, CourseMonetizable.PAYMENT]),
  courseType: z.enum([CourseType.LESSON, CourseType.COURSE]),
  courseDescription: z.string(),
  courseCompetence: z.enum([CourseCompetence.BASIC, CourseCompetence.INTERMEDIATE]),
  coursePlatform: z.enum([CoursePlatform.POWER_APPS, CoursePlatform.APP_SHEET]),
  courseLanguage: z.enum(['es', 'en']),
});

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const createCourseDetailsSchema = z.object({
  courseLearnings: z.array(z.string()).optional(),
  courseBenefits: z.array(z.string()).optional(),
  courseRequirements: z.array(z.string()).optional(),
  coursePoster: z
    .instanceof(File)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Solo se aceptan archivos .jpg, .jpeg, .png, .webp y .gif.'
    ),
});

export const createModuleLessonSchema = z.object({
  title: z.string(),
  video: z.instanceof(File),
  thumbnail: z
    .instanceof(File)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Solo se aceptan archivos .jpg, .jpeg, .png, .webp y .gif.'
    ),
});

export const createModuleSchema = z.object({
  title: z.string(),
  lessons: z.array(createModuleLessonSchema),
});

export type CreateCourseType = z.infer<typeof createCourseSchema>;
export type CreateCourseDetailsType = z.infer<typeof createCourseDetailsSchema>;
export type CreateModuleType = z.infer<typeof createModuleSchema>;
export type CreateModuleLessonType = z.infer<typeof createModuleLessonSchema>;
