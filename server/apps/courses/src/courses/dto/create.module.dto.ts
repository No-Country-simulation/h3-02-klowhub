import { z } from 'zod';

export const createModuleSchema = z.object({
  token: z.string().optional(),
  courseId: z.string().optional(),
  moduleTitle: z.string().min(1, 'El título del módulo es requerido'),
  moduleDescription: z.string().optional(),
});

export type CreateModuleDto = z.infer<typeof createModuleSchema>;
