import { atomWithPersistence } from '@core/services/persistStore';
import type { CourseCart } from '@features/courses/models/courseCart.type';

export const cartStoreAtom = atomWithPersistence<CourseCart[]>('coursCart', []);
