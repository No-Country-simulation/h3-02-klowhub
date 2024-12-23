import { z } from 'zod';
import type { TranslationType } from '@core/models/translationType.type';

export const useAuthSchema = (messages: TranslationType<'Validations'>) => {
  return z.object({
    email: z
      .string({ message: messages('emailRequired') })
      .email({ message: messages('emailInvalid') }),
    password: z.string({ message: messages('passwordRequired') }),
  });
};
export const useSignupSchema = (messages: TranslationType<'Validations'>) => {
  return z.object({
    email: z
      .string({ message: messages('emailRequired') })
      .email({ message: messages('emailInvalid') }),
    password: z.string({ message: messages('passwordRequired') }),
    firstName: z.string({ message: messages('firstnameRequired') }),
  });
};

export const signupSchema = (t: TranslationType<'Validations'>) => useSignupSchema(t);
export const signinSchema = (t: TranslationType<'Validations'>) => useAuthSchema(t);
