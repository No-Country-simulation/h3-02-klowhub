/* eslint-disable @typescript-eslint/no-explicit-any */
import { atomWithPersistence } from '@core/services/persistStore';

export interface CourseCreateModules {
  courseId: string;
  modules: any[];
}

export const courseResourcesStore = atomWithPersistence<CourseCreateModules>('courseModules', {
  courseId: '',
  modules: [],
});
