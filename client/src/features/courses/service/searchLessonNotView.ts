import { type VideoModuleType } from '../schemas/video-schemas';

export function updateLessonViewStatus(
  modules: VideoModuleType[],
  lessonId: string | number
): { updated: boolean; updatedModules: VideoModuleType[] } {
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
