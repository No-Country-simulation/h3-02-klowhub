import { z } from 'zod';
import type { TranslationType } from '@root/src/core/types/translationType';

export const useAuthSchema = (messages: TranslationType) => {
  return z.object({
    email: z
      .string({ message: messages('emailRequired') })
      .email({ message: messages('emailInvalid') }),
    password: z.string({ message: messages('passwordRequired') }),
  });
};

export const signupSchema = (t: TranslationType) => useAuthSchema(t);
export const signinSchema = (t: TranslationType) => useAuthSchema(t);
