import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button from '@core/components/Button';
import RecommendProjectCard from '../RecommendProjectCard/Index';

export default function RecommendProjectSection() {
  const t = useTranslations<'Creator'>('Creator');
  const ct = useTranslations<'Common'>('Common');
  return (
    <section className="flex size-full flex-col gap-y-4 text-white">
      <h2 className="pb-4 text-2xl font-bold leading-6">{t('recommendedTitle')}</h2>
      <p className="pb-4 text-sm md:text-base">{t('recommendedDescription')}</p>
      <div className="flex flex-row gap-x-4">
        <RecommendProjectCard
          title="Solución integral para la gestión de tareas y seguimiento de proyectos en tiempo real."
          subTitle="Crear una aplicación que permita a los equipos organizar, asignar y priorizar tareas diarias de manera intuitiva."
          ownerName="Santiago López"
          ownerHeader="Instructor y desarrollador"
          profile="/images/mocks/avatar_mock3.png"
          platform="AppSheet"
          ratingText="Calificacion del instructor"
          rating={5}
          viewDetails={ct('viewDetails')}
          published="Publicado hace 3 dias"
          tags={['CRM', 'Clientes', 'Ventas']}
        />
        <RecommendProjectCard
          className="hidden min-[1080px]:block"
          title="Solución integral para la gestión de tareas y seguimiento de proyectos en tiempo real."
          subTitle="Crear una aplicación que permita a los equipos organizar, asignar y priorizar tareas diarias de manera intuitiva."
          ownerName="Santiago López"
          ownerHeader="Instructor y desarrollador"
          profile="/images/mocks/avatar_mock3.png"
          platform="AppSheet"
          ratingText="Calificacion del instructor"
          rating={5}
          viewDetails={ct('viewDetails')}
          published="Publicado hace 3 dias"
          tags={['CRM', 'Clientes', 'Ventas']}
        />
        <RecommendProjectCard
          className="hidden min-[1080px]:block"
          title="Solución integral para la gestión de tareas y seguimiento de proyectos en tiempo real."
          subTitle="Crear una aplicación que permita a los equipos organizar, asignar y priorizar tareas diarias de manera intuitiva."
          ownerName="Santiago López"
          ownerHeader="Instructor y desarrollador"
          profile="/images/mocks/avatar_mock3.png"
          platform="AppSheet"
          ratingText="Calificacion del instructor"
          rating={5}
          viewDetails={ct('viewDetails')}
          published="Publicado hace 3 dias"
          tags={['CRM', 'Clientes', 'Ventas']}
        />
      </div>
      <div className="mx-auto mt-3 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/projects">{t('viewProjects')}</Link>
        </Button>
      </div>
    </section>
  );
}
