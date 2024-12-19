import { getTranslations } from 'next-intl/server';
import React from 'react';
import { getProfile } from '@core/services/services.getProfile';
import InfoCard from './InfoCard';
import OptimizeCard from './OptimizeCard';
import UserProfileCard from './UserProfileCard';

const infoCardsData = [
  {
    title: 'Inicio de sesión y seguridad',
    description: 'Actualiza tu contraseña y protege tu cuenta.',
  },
  {
    title: 'Pagos y cobros',
    description: 'Revisar pagos, cobros, cupones y tarjetas de regalo.',
  },
  {
    title: 'Información personal',
    description: 'Proporcione datos personales y cómo podemos comunicarnos con usted.',
  },
  {
    title: 'Impuestos',
    description: 'Gestionar la información del contribuyente y los documentos fiscales.',
  },
  {
    title: 'Información personal',
    description: 'Gestionar la información del contribuyente y los documentos fiscales.',
  },
  {
    title: 'Impuestos',
    description: 'Gestionar la información del contribuyente y los documentos fiscales.',
  },
];

export const UserProfile = async () => {
  // Arreglo de objetos con la información para InfoCard
  const t = await getTranslations<'Cart'>('Cart');
  const creator = await getProfile();

  return (
    <div>
      <h2 className="mb-2 ml-1 text-2xl font-bold text-white">{t('title')}</h2>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Columna izquierda - Sección principal */}
        <div className="lg:w-3/7 flex w-full flex-col gap-6 rounded-lg bg-neutral-100 shadow-app-1">
          {/* Tarjeta de perfil de usuario */}

          <UserProfileCard creator={creator} />

          {/* Grid de tarjetas de información */}
          <div className="grid grid-cols-1 gap-4 bg-neutral-100 p-4 md:grid-cols-3">
            {infoCardsData.map((card, index) => (
              <InfoCard key={index} title={card.title} description={card.description} />
            ))}
          </div>
        </div>

        {/* Columna derecha - Tarjeta de optimización */}
        <div className="w-full lg:w-1/4">
          <OptimizeCard
            imageSrc="/images/mocks/course_mock3.png"
            title={t('OptimizaPerfiltitulo')}
            description={t('OptimizaPerfiltitulodec')}
            buttonText={t('IrCursos')}
          />
        </div>
      </div>
    </div>
  );
};
