import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '@core/components/Button';

interface OptimizeCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
}

const OptimizeCard: React.FC<OptimizeCardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="rounded-lg bg-neutral-100 text-center text-white shadow-app-1">
      {/* Imagen */}
      <Image
        src={imageSrc}
        alt={title}
        className="mb-6 h-[330px] w-full rounded-t-lg object-cover"
        width={300}
        height={150}
      />

      {/* Título */}
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>

      {/* Descripción */}
      <p className="text-md mb-5 px-3 text-center text-gray-300">{description}</p>

      {/* Botón */}
      <Button
        variant={'default'}
        size={'fit'}
        className="mb-6 mt-2 rounded-md px-4 py-3 text-white hover:bg-fuchsia-800">
        <Link href="/courses">{buttonText}</Link>
      </Button>
    </div>
  );
};

export default OptimizeCard;
