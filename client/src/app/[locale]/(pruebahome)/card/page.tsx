import { useTranslations } from 'next-intl';
import CourseCard from '@features/home/components/CourseCard';
import { VerMas } from '@features/home/components/VerMas/VerMas';

const Page = () => {
  const t = useTranslations<'Card'>('Card');

  return (
    <div className="bg-[#1F2937] pt-8">
      <div className="mx-auto w-full max-w-[90%]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{t('titulo')}</h1>
          <p className="text-gray-300">{t('desc')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            title={t('title')}
            description={t('description')}
            price="80.000"
            rating={3.5}
            reviews={136}
            textButton={t('textButton')}
            tags={['Logistica', 'Optimización', 'Inventarios']}
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
            categoria="Lección"
          />

          <CourseCard
            title="Automatiza tus procesos con AppSheet"
            description="Aprende a simplificar y automatizar tareas rutinarias utilizando las herramientas intuitivas de AppSheetHub."
            price="25.000"
            rating={3.5}
            reviews={136}
            textButton="Power Apps"
            tags={['Logistica', 'Optimización', 'Inventarios']}
            imageSrc="/images/mocks/course_mock2.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/svg/powerapp.svg"
            categoria="Curso"
          />

          <CourseCard
            title="Creación de aplicaciones empresariales"
            description="Descubre cómo desarrollar aplicaciones personalizadas que optimicen los procesos de tu empresa"
            price="gratis"
            rating={3.5}
            reviews={136}
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            textButton="AppSheet"
            emoji="/images/appsheet_logo.png"
            categoria="Curso"
          />
        </div>
        <VerMas />
      </div>
    </div>
  );
};

export default Page;
