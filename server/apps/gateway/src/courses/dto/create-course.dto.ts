import { z } from 'zod';

// Paso 1: Información básica del curso
export const StepOneSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' }),
  contentType: z.enum(['free', 'premium']),
  courseType: z.enum(['appsheet', 'powerapps']),
  kind: z.enum(['course', 'lesson']),
});

// Paso 2: Descripción detallada
export const StepTwoSchema = z.object({
  basicDescription: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  detailedContent: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

// Paso 3: Módulos y lecciones
export const StepThreeSchema = z.object({
  modules: z
    .array(
      z.object({
        moduleTitle: z.string().min(3, {
          message: 'Module title must be at least 3 characters long',
        }),
        moduleDescription: z.string().optional(),
        lessons: z
          .array(
            z.object({
              lessonTitle: z.string().min(3, {
                message: 'Lesson title must be at least 3 characters long',
              }),
              lessonDescription: z.string().optional(),
              materialUrl: z.string().url().optional(),
              uploadedMaterial: z.string().optional(),
              videoUrl: z.string().url().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

// Combinar los tres pasos en un esquema general
export const CreateCourseSchema = StepOneSchema.merge(StepTwoSchema)
  .merge(StepThreeSchema)
  .extend({
    userId: z.string(),
  });

export type StepOneDto = z.infer<typeof StepOneSchema>;
export type StepTwoDto = z.infer<typeof StepTwoSchema>;
export type StepThreeDto = z.infer<typeof StepThreeSchema>;
export type CreateCourseDto = z.infer<typeof CreateCourseSchema>;
