import { atomWithPersistence } from '@core/services/persistStore';

export interface CourseFiles {
  coursePoster: string | undefined;
}

export const courseResourcesStore = atomWithPersistence<CourseFiles>('courseResources', {
  coursePoster: undefined,
});
