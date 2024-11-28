import type { z } from 'zod';
import { videoModuleSchema } from '../schemas/video-schemas';

export function updateLessonViewStatus(
  modules: z.infer<typeof videoModuleSchema>[],
  lessonId: string | number
) {
  let updated = false;
  const updatedModules = modules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => {
      updated = true;
      return lesson.id === lessonId ? { ...lesson, isViewd: true } : lesson;
    }),
  }));

  return {
    updated,
    updatedModules,
  };
}
