import type { FieldType } from '@/core/types/fields';
import type { TranslationType } from '@root/src/core/types/translationType';

export const useAuthFields = (t: TranslationType): FieldType[] => {
  return [
    {
      id: 'emailField',
      name: 'email',
      type: 'email',
      placeholder: t('emailLabel'),
      tabindex: 1,
      autoComplete: 'email',
    },
    {
      id: 'passwordField',
      name: 'password',
      type: 'password',
      placeholder: t('passwordLabel'),
      tabindex: 2,
      activeForgot: true,
    },
  ];
};

export const signinField = (t: TranslationType) => useAuthFields(t);

export const signupFields = (t: TranslationType) => useAuthFields(t);
