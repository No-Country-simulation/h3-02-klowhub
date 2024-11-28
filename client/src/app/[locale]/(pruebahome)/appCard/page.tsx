import { useTranslations } from 'next-intl';
import React from 'react';
import AppCard from '@features/home/components/AppCard';
import { VerMas } from '@features/home/components/VerMas/VerMas';

const Page: React.FC = () => {
  const t = useTranslations('AppCard');

  return (
    <div className="bg-[#1F2937] pt-8">
      <div className="mx-auto w-full max-w-[90%]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{t('titulo')}</h1>
          <p className="text-gray-300">{t('desc')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AppCard
            //  title={t('connectWithExperts')}
            title="Control de Inventario para retail"
            description="App diseñada para gestionar y monitorear el stock en tiendas físicas"
            price="12.500"
            rating={4.1}
            reviews={74}
            textButton="Power Apps"
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/app_mock1.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/svg/powerapp.svg"
          />

          <AppCard
            title="Gestión de inventario"
            description="Una aplicación para controlar y administrar el inventario de tu empresa en tiempo real."
            price="25.000"
            rating={4.1}
            reviews={74}
            textButton="AppSheet"
            tags={['Logistica', 'Optimización', 'Inventarios']}
            imageSrc="/images/mocks/app_mock2.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
          />

          <AppCard
            title="Seguimiento de proyectos"
            description="Una herramienta para asignar tareas, establecer plazos y monitorear el progreso"
            price="gratis"
            rating={4.1}
            reviews={74}
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/app_mock4.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            textButton="Power Apps"
            emoji="/svg/powerapp.svg"
          />
          <AppCard
            title="Registro de clientes"
            description="Una aplicación para almacenar información de clientes y comunicaciones"
            price="38.700"
            rating={4.1}
            reviews={74}
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/app_mock3.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            textButton="AppSheet"
            emoji="/images/appsheet_logo.png"
          />
        </div>
        <VerMas />
      </div>
    </div>
  );
};

export default Page;
