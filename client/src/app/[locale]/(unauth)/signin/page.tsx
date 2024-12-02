import { getTranslations, setRequestLocale } from 'next-intl/server';
import Footer from '@core/components/Footer/index';
import { getFieldsMessages } from '@core/lib/i18nFields';
import { routing } from '@core/lib/i18nRouting';
import SigninForm from '@features/auth/components/SigninForm';
import AuthLayout from '@features/auth/layouts/AuthLayout';

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/signin`,
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
        imageUrl="/images/signinBanner.png"
        title="KlowHub"
        description="Explora, aprende, enseña y conecta. Crea tu cuenta en KlowHub y accede a un mundo de posibilidades.">
        <SigninForm
          btnText={t('signin')}
          fieldsTranslate={fields}
          linkText={t('signup')}
          text1={t('signText1')}
          text2={t('signText2')}
          text3={t('signText3')}
          text4={t('signText4')}
          textButoons={t('signTextButtons')}
          textpreLinkin="No tienes cuenta ? "
        />
      </AuthLayout>
      <Footer></Footer>
    </div>
  );
}
