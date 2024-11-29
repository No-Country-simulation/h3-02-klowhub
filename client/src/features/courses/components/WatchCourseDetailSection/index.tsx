import Image from 'next/image';
import Button from '@core/components/Button';
import CheckList from '@core/components/CheckList';
import H2SimpleSection from '@core/components/H2SimpleSection';
import { courseDetailsSchema } from '../../types/coursedetails.types';

export default async function WatchCourseDetailSection() {
  const result = await fetch('http://localhost:3000/json/course-detail.json');
  const dataUnknown = await result.json();
  const courseDetail = courseDetailsSchema.safeParse(dataUnknown);
  if (!courseDetail.success) {
    return (
      <section className="mx-auto flex h-[500px] w-full items-center justify-center rounded-lg bg-white/10 p-4 shadow-app-1">
        <p className="text-center font-semibold text-red-400">
          Error inesperado al cargar la informacion del curso
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1148px] flex-1 basis-[73%] space-y-6 rounded-lg bg-white/10 p-5 shadow-app-1 backdrop-blur-sm">
      <header className="flex flex-col items-center justify-start space-y-6 text-white">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-bold">{courseDetail.data.name}</h1>
          <div></div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-start gap-3">
              <Image
                src={courseDetail.data?.creatorAvatar || '/images/mocks/avatar_mock2.png'}
                alt={courseDetail.data.creatorName}
                width={54}
                height={54}
                className="aspect-square rounded-full object-cover object-center"
              />
              <div>
                <p className="text-[15px] font-medium">{courseDetail.data.creatorName}</p>
                <span className="text-sm text-[#D8C5C5]">{courseDetail.data.creatorHeader}</span>
              </div>
            </div>
            <Button variant="default" className="font-semibold text-white">
              Suscribirme
            </Button>
          </div>
          <div className="flex flex-col space-y-3">
            <Button
              variant="neutral"
              className="pointer-events-none cursor-default select-none px-5">
              Power Apps
            </Button>
            <Button variant="outline" className="px-5">
              Compartir
            </Button>
          </div>
        </div>
      </header>
      <H2SimpleSection title="Despues de completar este curso, seras capaz de:">
        <CheckList items={courseDetail.data.courseLearnings} />
      </H2SimpleSection>
      <H2SimpleSection title="Acerca de este curso">
        <p className="text-sm font-normal text-white">{courseDetail.data.courseAbout}</p>
      </H2SimpleSection>
      <H2SimpleSection
        title={`¿Por qué aprender con ${courseDetail.data.creatorName}?`}
        titleVariant="textxl">
        <p className="text-sm font-normal text-white">{courseDetail.data.creatorDescription}</p>
      </H2SimpleSection>
      <H2SimpleSection title={`¿Para quién es este curso?`} titleVariant="textxl">
        <p className="text-sm font-normal text-white">{courseDetail.data.courseObjective}</p>
      </H2SimpleSection>
      <H2SimpleSection title={`Requisitos`} titleVariant="textxl">
        <CheckList items={courseDetail.data.courseRequirenments} />
      </H2SimpleSection>
      <H2SimpleSection title={`¿Qué incluye?`} titleVariant="textxl">
        <CheckList items={courseDetail.data.courseAdditions} />
      </H2SimpleSection>
    </section>
  );
}
