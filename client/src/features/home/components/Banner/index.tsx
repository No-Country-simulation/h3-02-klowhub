import Image, { type StaticImageData } from 'next/image';
import React from 'react';
import { cn } from '@root/src/core/lib/utils';

// Interface para definir las propiedades del componente, titulo, descripción, imagen
interface IBannerProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  type?: 'explorer' | 'creator';
}

// funciion de react con las propiedades definidas en la interface IBannerProps
const BannerCta: React.FC<IBannerProps> = ({ title, description, imageSrc, type = 'explorer' }) => {
  return (
    //<div className="relative flex items-center justify-start bg-gradient-to-r from-blue-900 to-purple-900 text-white py-4 px-6 rounded-lg max-w-6xl mx-auto overflow-hidden h-64 md:h-80 lg:h-60  border-gray-300">
    // clases de tailiwind  para posicionar, alinear, degradado de fondo, color de fondo, padding, redondeo de esquinas, ancho y centrado automatico, ocultar contenido desbordado, definir la altura en varias resoluciones, añadir color
    <div className="max-w-8xl relative m-4 mx-auto flex h-60 items-center justify-start overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 to-purple-900 px-6 py-4 text-white shadow-sm sm:h-60 md:h-60 md:shadow-md lg:h-60 lg:shadow-lg xl:h-60 xl:shadow-xl">
      {/* div que contiene el texto title y description*/}
      <div className={cn('z-10 p-2 md:w-1/2', type === 'creator' ? 'mx-auto text-center' : '')}>
        <h2
          className={cn(
            'mp-2 mb-2 font-semibold',
            type === 'creator'
              ? 'text-3xl md:text-5xl md:leading-[4rem] lg:text-6xl lg:leading-[4.75rem]'
              : 'text-2xl md:text-3xl'
          )}>
          {title}
        </h2>
        <p
          className={cn(
            'mb-2',
            type === 'creator' ? 'text-sm md:text-xl' : 'text-sm md:text-base'
          )}>
          {description}
        </p>
      </div>

      {/* Imagen de fondo con degradado */}
      <div className="absolute inset-0 h-full overflow-hidden">
        <Image
          src={imageSrc}
          fill
          alt="Background graphic"
          className="size-full object-cover object-center opacity-80"
        />
        {/* Degradado sobre la imagen */}
        <div className="bg-gradient absolute inset-0 from-transparent to-blue-900 opacity-70" />
      </div>
    </div>
  );
};

export default BannerCta;
