import React from 'react';
import CardTeacher from '@root/src/features/home/components/MentorCard';
import { VerMas } from '@root/src/features/home/components/VerMas/VerMas';

const Page: React.FC = () => {
  return (
    <div className="bg-[#1F2937] pt-8">
      <div className="mx-auto w-full max-w-[90%]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardTeacher
            title="Martin Fernandez"
            price="6"
            reviews={136}
            textButton="AppShet"
            imageSrc="/images/mocks/mentor_mock1.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
            urlPais="/svg/argentina.svg"
            sessions="50"
            idioma="Español"
          />

          <CardTeacher
            title="Laura Sánchez"
            price="6"
            reviews={136}
            textButton="Power Apps"
            imageSrc="/images/mocks/mentor_mock2.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/svg/powerapp.svg"
            urlPais="/svg/argentina.svg"
            sessions="50"
            idioma="Español"
          />

          <CardTeacher
            title="Marco Rojas"
            price="6"
            reviews={136}
            imageSrc="/images/mocks/mentor_mock3.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            textButton="AppSheet"
            emoji="/images/appsheet_logo.png"
            urlPais="/svg/argentina.svg"
            sessions="50"
            idioma="Español"
          />

          <CardTeacher
            title="Nora Martínez"
            price="6"
            reviews={123}
            textButton="AppSheet"
            imageSrc="/images/mocks/mentor_mock4.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
            urlPais="/svg/argentina.svg"
            sessions="50"
            idioma="Español"
          />
        </div>

        <VerMas />
      </div>
    </div>
  );
};

export default Page;
