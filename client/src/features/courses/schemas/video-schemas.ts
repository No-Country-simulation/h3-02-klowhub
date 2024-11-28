import { z } from 'zod';

export const videoLessonsSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  duration: z.string(),
  thumbnail: z.string(),
  isViewd: z.boolean().optional(),
});

export const videoModuleSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string(),
  lessons: z.array(videoLessonsSchema),
});

export const videoCourseSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
  lastModuleId: z.string().or(z.number()),
  lastLessonId: z.string().or(z.number()),
  modules: z.array(videoModuleSchema),
});

export const videoFirmedSchema = z.object({
  id: z.string().or(z.number()),
  src: z.string(),
});

export type VideoLessonsType = z.infer<typeof videoLessonsSchema>;
export type VideoModuleType = z.infer<typeof videoModuleSchema>;
export type VideoCourseType = z.infer<typeof videoCourseSchema>;
export type VideoFirmedType = z.infer<typeof videoFirmedSchema>;
