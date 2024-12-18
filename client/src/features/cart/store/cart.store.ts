import { atomWithPersistence } from '@core/services/persistStore';
import type { CourseCart } from '@features/courses/types/courseCart';

export const cartStoreAtom = atomWithPersistence<CourseCart[]>('coursCart', []);
