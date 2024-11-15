import { getTranslations, setRequestLocale } from 'next-intl/server';
import SignupForm from '@features/auth/components/SignupForm';
import { getFieldsMessages } from '@root/src/core/lib/i18nFields';

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  //Para componentes asincronos usar "getTranslations"
  const t = await getTranslations<'Auth'>('Auth');
  const fields = await getFieldsMessages();
  return (
    <div className="flex flex-col">
      <SignupForm btnText={t('signup')} fieldsTranslate={fields} linkText={t('haveAccount')} />
    </div>
  );
}
