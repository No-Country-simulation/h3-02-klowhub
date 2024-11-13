import { getTranslations, setRequestLocale } from 'next-intl/server';
import SigninForm from '@features/auth/components/SigninForm';
import { getFieldsMessages } from '@root/src/core/lib/i18nFields';

export default async function SignupPage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);
  //Para componentes asincronos usar "getTranslations"
  const t = await getTranslations('Auth');
  const fields = await getFieldsMessages();
  return (
    <div className="flex flex-col">
      <SigninForm btnText={t('signin')} fieldsTranslate={fields} linkText={t('notHaveAccount')} />
    </div>
  );
}
