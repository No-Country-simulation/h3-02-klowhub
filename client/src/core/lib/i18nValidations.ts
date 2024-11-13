import { useTranslations } from 'next-intl';

//Recupera los mensajes para las validaciones de zod segun el locale
export const useValidationMessages = () => {
  const t = useTranslations('Validations');
  return t;
};
