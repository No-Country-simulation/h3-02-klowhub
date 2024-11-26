import { z } from 'zod';

// Paso 1: Información básica del curso
export const StepOneSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }), // Limitar la longitud
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
export const LessonSchema = z.object({
  lessonTitle: z
    .string()
    .min(3, { message: 'Lesson title must be at least 3 characters long' }),
  lessonDescription: z.string().optional(),
  materialUrl: z.string().url().optional(),
  uploadedMaterial: z.string().optional(),
  videoUrl: z.string().url().optional(),
});

export const ModuleSchema = z.object({
  moduleTitle: z
    .string()
    .min(3, { message: 'Module title must be at least 3 characters long' }),
  moduleDescription: z.string().optional(),
  lessons: z.array(LessonSchema).optional(),
});

export const StepThreeSchema = z.object({
  modules: z.array(ModuleSchema).optional(),
});

// Paso 4: Información de fusiones
export const MergeInfoSchema = z.object({
  discountPercentage: z.number().min(0).max(100).optional(),
  relatedCourses: z.array(z.string()).optional(),
});

// Combinar todos los pasos en un esquema general
export const CreateCourseSchema = StepOneSchema.merge(StepTwoSchema)
  .merge(StepThreeSchema)
  .extend({
    mergeInfo: MergeInfoSchema.optional(),
    userId: z.string(), // Se debe incluir desde el token
  });

export type CreateCourseDto = z.infer<typeof CreateCourseSchema>;
