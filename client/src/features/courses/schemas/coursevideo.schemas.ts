import { z } from 'zod';
import { idSchema, nameSchema } from '@core/schemas/common.schema';

export const videoLessonsSchema = z.object({
  id: idSchema,
  _id: idSchema,
  name: nameSchema,
  duration: z.string(),
  isViewd: z.boolean().optional(),
  videoUrl: z.string(),
});

export const videoModuleSchema = z.object({
  id: idSchema,
  _id: idSchema,
  title: z.string(),
  lessons: z.array(videoLessonsSchema),
});

export const videoCourseSchema = z.object({
  id: idSchema,
  name: nameSchema,
  lastModuleId: idSchema,
  lastLessonId: idSchema,
  modules: z.array(videoModuleSchema),
});

export const videoFirmedSchema = z.object({
  id: idSchema,
  src: z.string(),
});

export type VideoLessonsType = z.infer<typeof videoLessonsSchema>;
export type VideoModuleType = z.infer<typeof videoModuleSchema>;
export type VideoCourseType = z.infer<typeof videoCourseSchema>;
export type VideoFirmedType = z.infer<typeof videoFirmedSchema>;
