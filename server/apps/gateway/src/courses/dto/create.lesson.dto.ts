import { z } from 'zod';

export const createLessonSchema = z.object({
  lessonTitle: z.string().min(1, 'El título de la lección es requerido'),
  lessonDescription: z.string().optional(),
  materialUrl: z.string().url().optional(),
  uploadedMaterial: z.string().optional(),
  videoUrl: z.string().url().optional(),
});

export type CreateLessonDto = z.infer<typeof createLessonSchema>;
