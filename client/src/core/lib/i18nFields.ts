import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

//Recupera los mensajes para los fields segun el locale
export const useFieldsMessages = () => {
  const t = useTranslations('Fields');
  return t;
};

export const getFieldsMessages = async () => {
  return await getTranslations<'Fields'>('Fields');
};
