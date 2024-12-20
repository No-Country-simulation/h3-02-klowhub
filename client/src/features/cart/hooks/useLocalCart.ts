'use client';

import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { cartStoreAtom } from '@features/cart/store/cart.store';
import type { CourseCart } from '@features/courses/models/courseCart.type';

export const useLocalCart = () => {
  const [stored, setStored] = useAtom(cartStoreAtom);
  const isStored = useCallback(
    (id: string | number) => stored.some(item => item.courseId === id),
    [stored]
  );

  const saveToCart = useCallback(
    (object: CourseCart) => {
      setStored(prev => {
        // Encuentra el índice del elemento a eliminar
        const index = prev.findIndex(item => item.courseId === object.courseId);

        // Si el elemento existe, elimínalo manteniendo el orden
        if (index !== -1) {
          return prev.filter(item => item.courseId !== object.courseId);
        }

        // Si no existe, agrégalo
        return [...prev, object];
      });
    },
    [setStored]
  );

  const removeFromCart = useCallback(
    (id: string | number) => {
      setStored(prev => prev.filter(item => item.courseId !== id));
    },
    [setStored]
  );

  return { stored, saveToCart, isStored, removeFromCart } as const;
};
