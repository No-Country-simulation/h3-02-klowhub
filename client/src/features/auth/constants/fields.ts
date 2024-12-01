import type { FieldType } from '@core/types/fields';
import type { TranslationType } from '@core/types/translationType';

export const useAuthFieldsin = (t: TranslationType<'Fields'>): FieldType[] => {
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
export const useAuthFieldsup = (t: TranslationType<'Fields'>): FieldType[] => {
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
      id: 'nameField',
      name: 'name',
      type: 'name',
      placeholder: t('nameLabel'),
      tabindex: 1,
      autoComplete: 'email',
    },
    {
      id: 'passwordField',
      name: 'password',
      type: 'password',
      placeholder: t('passwordLabel'),
      tabindex: 2,
      activeForgot: false,
    },
  ];
};

export const signinField = (t: TranslationType<'Fields'>) => useAuthFieldsin(t);

export const signupFields = (t: TranslationType<'Fields'>) => useAuthFieldsup(t);
