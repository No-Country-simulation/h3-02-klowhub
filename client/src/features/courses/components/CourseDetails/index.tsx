import type { Locale } from '@core/lib/i18nRouting';
import { getContent } from '@core/services/getContent';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';
import type { CourseDetailsType } from '@features/courses/types/coursedetails.types';
import CourseSection from '@features/home/components/CourseSection';
import { Breadcrumb } from '@root/src/features/home/components/Courses/Breadcrumb';
import { MainContent } from './MainContent';
import { SectionRigth } from './SectionRigth';

interface CourseDetailsProps {
  courseId: string;
  locale: Locale;
}

export default async function CourseDetails({ courseId, locale }: CourseDetailsProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/es/platform' },
    { label: 'Cursos y lecciones', href: '/courses' },
    { label: 'Gestión de inventarios con Power Apps', href: '/#' },
  ];
  const creator = await getContent<CreatorCourseType>(`/json/${courseId}/user.json`);
  const course = await getContent<CourseDetailsType>(`/json/${courseId}/detail.json`);
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col items-start justify-between rounded-lg lg:mt-6 lg:flex-row">
        {/* Columna izquierda: Información principal del curso */}
        <MainContent
          creatorDesc={creator.description}
          creatorWhyLearning={creator.whyLearning}
          locale={locale}
          course={course}
        />

        {/* Columna derecha: Sobre el instructor y Programa del curso */}
        <SectionRigth
          courseId={course.id}
          isBuy={course.isBuyCourse}
          creator={creator}
          platform={course.platform}
        />
      </div>
      {/* <AppSection /> */}
      <CourseSection />
    </div>
  );
}
