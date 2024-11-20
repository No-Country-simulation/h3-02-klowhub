import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getFieldsMessages } from '@core/lib/i18nFields';
import { routing } from '@core/lib/i18nRouting';
import SignupForm from '@features/auth/components/SignupForm';
import AuthLayout from '@features/auth/layouts/AuthLayout';

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/signup`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  //Para componentes asincronos usar "getTranslations"
  const t = await getTranslations<'Auth'>('Auth');
  const fields = await getFieldsMessages();
  return (
    <div className="flex flex-col">
      <AuthLayout
        title="KlowHub"
        description="Explora, aprende, enseña y conecta. Crea tu cuenta en KlowHub y accede a un mundo de posibilidades.">
        <SignupForm btnText={t('signup')} fieldsTranslate={fields} linkText={t('haveAccount')} />
      </AuthLayout>
    </div>
  );
}
