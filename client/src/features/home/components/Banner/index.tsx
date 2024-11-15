import Image from 'next/image';
import React from 'react';

// Interface para definir las propiedades del componente, titulo, descripción, imagen
interface IBannerProps {
  title: string;
  description: string;
  imageSrc: string;
}

// funciion de react con las propiedades definidas en la interface IBannerProps
const BannerCta: React.FC<IBannerProps> = ({ title, description, imageSrc }) => {
  return (
    //<div className="relative flex items-center justify-start bg-gradient-to-r from-blue-900 to-purple-900 text-white py-4 px-6 rounded-lg max-w-6xl mx-auto overflow-hidden h-64 md:h-80 lg:h-60  border-gray-300">
    // clases de tailiwind  para posicionar, alinear, degradado de fondo, color de fondo, padding, redondeo de esquinas, ancho y centrado automatico, ocultar contenido desbordado, definir la altura en varias resoluciones, añadir color
    <div className="max-w-8xl relative m-4 mx-auto flex h-60 items-center justify-start overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-purple-900 px-6 py-4 text-white shadow-sm sm:h-60 md:h-60 md:shadow-md lg:h-60 lg:shadow-lg xl:h-60 xl:shadow-xl">
      {/* div que contiene el texto title y description*/}
      <div className="z-10 p-2 md:w-1/2">
        <h2 className="mp-2 mb-2 text-2xl font-semibold md:text-3xl">{title}</h2>
        <p className="mb-2 text-sm md:text-base">{description}</p>
      </div>

      {/* Imagen de fondo con degradado */}
      <div className="absolute inset-0 h-full overflow-hidden">
        <Image
          src={imageSrc}
          alt="Background graphic"
          layout="fill"
          objectFit="cover"
          className="object-cover opacity-80"
        />
        {/* Degradado sobre la imagen */}
        <div className="bg-gradient absolute inset-0 from-transparent to-blue-900 opacity-70" />
      </div>
    </div>
  );
};

export default BannerCta;
