import CourseHorizontalCard from '@features/courses/components/CourseHorizontalCard';
import { Breadcrumb } from './Breadcrumb';
import { SearchBar } from './SearchBar';

export default function CoursesListSection() {
  const breadcrumbItems = [
    { label: 'Home', href: '/es/platform' },
    { label: 'Cursos y lecciones', href: '/courses' },
  ];
  return (
    <div className="w-full text-white">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mb-4 text-lg font-bold">Encuentra el aprendizaje que estás buscando</h1>

      <SearchBar />
      <CourseHorizontalCard
        imageUrl="/images/mocks/course_mock1.png"
        title="Automatización de flujos de trabajo con AppSheet"
        description="Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos."
        rating={4.1}
        reviews={74}
        textButton="AppSheet"
        emoji="/images/appsheet_logo.png"
        tags={['CRM', 'Clientes', 'Ventas']}
        categoria="Curso"
      />
      <CourseHorizontalCard
        imageUrl="/images/mocks/course_mock2.png"
        title="Automatización de flujos de trabajo con AppSheet"
        description="Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos."
        rating={4.1}
        reviews={74}
        textButton="Power Apps"
        emoji="/svg/powerapp.svg"
        tags={['CRM', 'Clientes', 'Ventas']}
        categoria="Curso"
      />

      <CourseHorizontalCard
        imageUrl="/images/mocks/course_mock3png.png"
        title="Automatización de flujos de trabajo con AppSheet"
        description="Conviértete en un experto en AppSheetHub y aprende a crear aplicaciones sin escribir una sola línea de código.Desarrollar aplicaciones personalizadas"
        rating={4.1}
        reviews={74}
        textButton="Power Apps"
        emoji="/svg/powerapp.svg"
        tags={['CRM', 'Clientes', 'Ventas']}
        categoria="Curso"
      />
    </div>
  );
}
