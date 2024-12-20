import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@core/lib/i18nRouting';
import CreateCourseForm from '@features/courses/components/CreateCourseForm';
import type { CourseFields } from '@features/courses/models/courseFields.type';
import { CreateCourseTriggers } from '@features/courses/models/enums/createCourse.enum';

export default async function CreatorCoursesPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nct = await getTranslations<'NewCourse'>({ locale: locale, namespace: 'NewCourse' });
  const t = await getTranslations<'Fields'>({ locale: locale, namespace: 'Fields' });
  const ct = await getTranslations<'Common'>({ locale: locale, namespace: 'Common' });
  const fields: CourseFields = {
    general: {
      title: {
        label: t('courseTitleLabel'),
        placeholder: t('courseTitlePlaceholder'),
      },
      alert: t('courseAlert'),
      payment: {
        label: t('coursePaymentLabel'),
        free: t('coursePaymentFree'),
        premium: t('coursePaymentPremium'),
      },
      type: {
        label: t('courseTypeLabel'),
        course: t('courseTypeCourse'),
        lesson: t('courseTypeLesson'),
      },
      description: {
        label: t('courseDescriptionLabel'),
        placeholder: t('courseDescriptionPlaceholder'),
      },
      level: {
        label: t('courseLevelLabel'),
        basic: t('courseLevelBasic'),
        mid: t('courseLevelMid'),
        advanced: t('courseLevelAdvanced'),
      },
      platform: {
        label: t('coursePlatformLabel'),
      },
      language: {
        label: t('courseLanguageLabel'),
        placeholder: t('courseLanguagePlaceholder'),
      },
    },
    details: {
      learnings: {
        label: t('courseLearningsLabel'),
        placeholder: t('courseEmptyPlaceholder', { some: nct('courseLearning') }),
      },
      requirements: {
        label: t('courseRequirementsLabel'),
        placeholder: t('courseEmptyPlaceholder', { some: nct('courseRequirements') }),
      },
      benefits: {
        label: t('courseBenefitsLabel'),
        placeholder: t('courseEmptyPlaceholder', { some: nct('courseBenefits') }),
      },
      poster: {
        label: t('coursePosterLabel'),
        placeholder: t('imageUploadPlaceholder'),
        info: t('imageUploadDropInfo'),
      },
    },
  };
  const triggers = [
    { label: nct('tabGeneralText'), value: CreateCourseTriggers.GENERAL, key: 'generalStep' },
    {
      label: nct('tabDetailsText'),
      value: CreateCourseTriggers.DETAILS,
      key: 'courseDetailsStep',
    },
    {
      label: nct('tabModulesText'),
      value: CreateCourseTriggers.MODULES,
      key: 'courseModulesStep',
    },
    {
      label: nct('tabPromotionText'),
      value: CreateCourseTriggers.PROMOTION,
      key: 'coursePromotionStep',
    },
  ];
  return (
    <main className="mb-20 mt-36 size-full space-y-8 px-10 sm:px-[51px] min-[1800px]:px-16">
      <h1 className="text-lg font-medium text-white">{nct('mainTitle')}</h1>
      <CreateCourseForm triggers={triggers} fields={fields} next={ct('next')} />
    </main>
  );
}

export async function generateStaticParams() {
  const paths = routing.locales.map(locale => ({
    locale,
    slug: `${locale}/creator/courses/new`,
  }));

  return paths.map(params => ({
    params,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  const t = await getTranslations<'NewCourse'>({ locale: locale, namespace: 'NewCourse' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      siteName: t('metaSiteName'),
      title: t('metaSiteName'),
      description: t('metaDescription'),
      locale: locale,
    },
  };
}
