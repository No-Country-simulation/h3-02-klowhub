import { useTranslations } from 'next-intl';
import React from 'react';
import Card from '@root/src/features/home/components/Card/Card';

const Page: React.FC = () => {
  const t = useTranslations('Card');

  return (
    <div className="bg-[#1F2937] pt-8">
      <div className="mx-auto w-full max-w-[90%]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{t('titulo')}</h1>
          <p className="text-gray-300">{t('desc')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            //  title={t('connectWithExperts')}
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

          <Card
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

          <Card
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

          <Card
            title="Automatización de flujos de trabajo con AppSheet"
            description="Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos."
            price="99.99"
            rating={4.5}
            reviews={123}
            textButton="AppSheet"
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
            categoria="Curso"
          />
          <Card
            title="Automatiza tus procesos con AppSheet"
            description="Aprende a simplificar y automatizar tareas rutinarias utilizando las herramientas intuitivas de AppSheetHub."
            price="99.99"
            rating={4.5}
            reviews={123}
            tags={['Logistica', 'Retail', 'Inventarios']}
            textButton="Power Apps"
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/svg/powerapp.svg"
            categoria="Curso"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
