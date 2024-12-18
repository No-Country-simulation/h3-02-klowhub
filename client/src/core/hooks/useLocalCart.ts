'use client';

import type { CourseCart } from '@features/courses/types/courseCart';
import { useLocalStorage } from './useLocalStorage';

export const useLocalCart = (storedKey: string) => {
  const [stored, setStored] = useLocalStorage<CourseCart[]>(storedKey, []);

  const saveToCart = (object: CourseCart) => {
    const $isStored = isStored(object.courseId);
    if (stored.length > 0 && $isStored) {
      setStored(prev => prev.filter(item => item.courseId !== object.courseId));
    } else {
      setStored(prev => [...prev, object]);
    }
  };

  const isStored = (id: string | number) => {
    return stored.some(item => item.courseId === id);
  };

  return { stored, saveToCart, isStored };
};
