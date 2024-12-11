import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import Button from '@core/components/Button';
import CheckList from '@core/components/CheckList';
import H2SimpleSection from '@core/components/H2SimpleSection';
import ShowMore from '@core/components/ShowMore';
import type { Locale } from '@core/lib/i18nRouting';
import { getContent } from '@core/services/getContent';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import type { CourseDetailsType } from '../../types/coursedetails.types';

export default async function WatchCourseDetailSection({ locale }: { locale: Locale }) {
  const courseDetail = await getContent<CourseDetailsType>('/json/course-detail.json');
  const t = await getTranslations<'CourseDetail'>({ locale: locale, namespace: 'CourseDetail' });
  const ct = await getTranslations<'Common'>({ locale: locale, namespace: 'Common' });
  if (!courseDetail) {
    return (
      <section className="mx-auto flex h-[500px] w-full items-center justify-center rounded-lg bg-white/10 p-4 shadow-app-1">
        <p className="text-center font-semibold text-red-400">
          Error inesperado al cargar la informacion del curso
        </p>
      </section>
    );
  }

  return (
    <ShowMore maxHeight={610}>
      <section className="h-fit w-full space-y-9 rounded-lg bg-white/10 px-4 py-8 shadow-app-1 backdrop-blur-sm min-[620px]:space-y-6 min-[620px]:px-14 min-[620px]:py-10">
        <header className="flex flex-col items-center justify-start space-y-6 text-white">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-xl font-bold">{courseDetail.name}</h1>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-y-6 min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-start gap-3">
                <Image
                  src={courseDetail?.creatorAvatar || '/images/mocks/avatar_mock2.png'}
                  alt={courseDetail.creatorName}
                  width={54}
                  height={54}
                  className="aspect-square rounded-full object-cover object-center"
                />
                <div>
                  <p className="text-[15px] font-medium">{courseDetail.creatorName}</p>
                  <span className="text-sm text-[#D8C5C5]">{courseDetail.creatorHeader}</span>
                </div>
              </div>
              {/* <Button variant="default" className="font-semibold text-white">
              Suscribirme
            </Button> */}
            </div>
            <div className="flex space-x-7 min-[620px]:flex-col min-[620px]:space-x-0 min-[620px]:space-y-3">
              <Button
                asChild
                variant="neutral"
                className="pointer-events-none select-none rounded-lg"
                size="default">
                <div>
                  <Image
                    src={getPlatformLogo(courseDetail.platform)}
                    alt={courseDetail.platform}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  {courseDetail.platform}
                </div>
              </Button>
              <Button variant="outline" className="px-5">
                {ct('share')}
              </Button>
            </div>
          </div>
        </header>
        <H2SimpleSection title={t('afterCompletingCourse')}>
          <CheckList items={courseDetail.courseLearnings} />
        </H2SimpleSection>
        <H2SimpleSection title={t('aboutCourse')}>
          <p className="text-sm font-normal text-white">{courseDetail.courseAbout}</p>
        </H2SimpleSection>
        <H2SimpleSection
          title={t('whyLearnWith', { creatorName: courseDetail.creatorName })}
          titleVariant="textxl">
          <p className="text-sm font-normal text-white">{courseDetail.creatorDescription}</p>
        </H2SimpleSection>
        <H2SimpleSection title={t('whoIsThisFor')} titleVariant="textxl">
          <p className="text-sm font-normal text-white">{courseDetail.courseObjective}</p>
        </H2SimpleSection>
        <H2SimpleSection title={t('requirements')} titleVariant="textxl">
          <CheckList items={courseDetail.courseRequirenments} />
        </H2SimpleSection>
        <H2SimpleSection title={t('whatIncludes')} titleVariant="textxl">
          <CheckList items={courseDetail.courseAdditions} />
        </H2SimpleSection>
      </section>
    </ShowMore>
  );
}
