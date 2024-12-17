import type { Locale } from '@core/lib/i18nRouting';
import { getContent } from '@core/services/getContent';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';
import type { CourseDetailsType } from '@features/courses/types/coursedetails.types';
import CourseSection from '@features/home/components/CourseSection';
import { Breadcrumb } from '@root/src/features/home/components/Courses/Breadcrumb';
import { MainContent } from './MainContent';
import { SectionRigth } from './SectionRigth';
//import { use } from 'react';
//import env from '@root/env.config';

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
  const course = await getContent<CourseDetailsType>(`courses/${courseId}`, undefined, 'API_URL');
  const userId = course.userId;
  console.log('Resultado API_URL:', course);
  console.log('userId', userId);
  /*const course = await getContent<CourseDetailsType>(
    `json/${courseId}/detail.json`,
    undefined,
    'APP_URL'
  );*/
  //const userId = course.creatorId;
  //console.log('Resultado APP_URL:', course);
  const creator = await getContent<CreatorCourseType>(`users/${userId}`, undefined, 'API_URL');
  console.log('Resultado API_URL:', creator);
  /*const creator = await getContent<CreatorCourseType>(
    `json/${userId}/user.json`,
    undefined,
    'APP_URL'
  );*/
  return (
    <div className="space-y-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col items-start justify-between rounded-lg lg:mt-6 lg:flex-row">
        {/* Columna izquierda: Información principal del curso */}
        <MainContent
          creatorDesc={creator.biograophy}
          creatorWhyLearning={creator.whyLeam}
          locale={locale}
          course={course}
        />

        {/* Columna derecha: Sobre el instructor y Programa del curso */}
        <SectionRigth
          courseId={course.id}
          isBuy={true}
          creator={creator}
          platform={course.platform}
        />
      </div>
      {/* <AppSection /> */}
      <CourseSection />
    </div>
  );
}
