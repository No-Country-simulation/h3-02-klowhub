import type { Locale } from '@core/lib/i18nRouting';
import CourseSection from '@features/home/components/CourseSection';
import { Breadcrumb } from '@root/src/features/home/components/Courses/Breadcrumb';
import { MainContent } from './MainContent';
import { SectionRigth } from './SectionRigth';

interface CourseDetailsProps {
  courseId: string;
  locale: Locale;
}

export default function CourseDetails({ courseId, locale }: CourseDetailsProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/es/platform' },
    { label: 'Cursos y lecciones', href: '/courses' },
    { label: 'Gestión de inventarios con Power Apps', href: '/#' },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col items-start justify-between rounded-lg shadow-lg lg:mt-6 lg:flex-row">
        {/* Columna izquierda: Información principal del curso */}
        <MainContent locale={locale} courseId={courseId} />

        {/* Columna derecha: Sobre el instructor y Programa del curso */}
        <SectionRigth />
      </div>
      {/* <AppSection /> */}
      <CourseSection />
    </div>
  );
}
