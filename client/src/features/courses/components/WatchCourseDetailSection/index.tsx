import Image from 'next/image';
import Button from '@core/components/Button';
import CheckList from '@core/components/CheckList';
import H2SimpleSection from '@core/components/H2SimpleSection';
import { getContent } from '@core/services/getContent';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import type { CourseDetailsType } from '../../types/coursedetails.types';

export default async function WatchCourseDetailSection() {
  const courseDetail = await getContent<CourseDetailsType>('/json/course-detail.json');

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
    <section className="h-fit w-full space-y-6 rounded-lg bg-white/10 px-14 py-10 shadow-app-1 backdrop-blur-sm">
      <header className="flex flex-col items-center justify-start space-y-6 text-white">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-bold">{courseDetail.name}</h1>
        </div>
        <div className="flex w-full items-center justify-between">
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
          <div className="flex flex-col space-y-3">
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
              Compartir
            </Button>
          </div>
        </div>
      </header>
      <H2SimpleSection title="Despues de completar este curso, seras capaz de:">
        <CheckList items={courseDetail.courseLearnings} />
      </H2SimpleSection>
      <H2SimpleSection title="Acerca de este curso">
        <p className="text-sm font-normal text-white">{courseDetail.courseAbout}</p>
      </H2SimpleSection>
      <H2SimpleSection
        title={`¿Por qué aprender con ${courseDetail.creatorName}?`}
        titleVariant="textxl">
        <p className="text-sm font-normal text-white">{courseDetail.creatorDescription}</p>
      </H2SimpleSection>
      <H2SimpleSection title={`¿Para quién es este curso?`} titleVariant="textxl">
        <p className="text-sm font-normal text-white">{courseDetail.courseObjective}</p>
      </H2SimpleSection>
      <H2SimpleSection title={`Requisitos`} titleVariant="textxl">
        <CheckList items={courseDetail.courseRequirenments} />
      </H2SimpleSection>
      <H2SimpleSection title={`¿Qué incluye?`} titleVariant="textxl">
        <CheckList items={courseDetail.courseAdditions} />
      </H2SimpleSection>
    </section>
  );
}
