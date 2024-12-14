import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';

interface CardCartProps {
  title: string;
  platform: string;
  sector: string;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  // onRemove: () => void;
}

const CardCart: React.FC<CardCartProps> = ({
  title,
  platform,
  sector,
  rating,
  reviews,
  tags,
  imageUrl,
  //onRemove,
}) => {
  const t = useTranslations<'SumaryCart'>('SumaryCart');
  return (
    <div className="mb-6 flex w-full flex-col rounded-lg border-2 border-[#21262f] bg-[#222934] p-4 text-white shadow-app-1 md:flex-row">
      {/* Image Section */}
      <div className="relative h-[240px] w-full flex-none md:w-1/3">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="size-full rounded-lg object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="m-2 flex flex-1 flex-col justify-between px-0 md:m-0 md:px-4 lg:px-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">{title}</h3>
          <p className="mb-3 text-sm text-slate-200">Plataforma: {platform}</p>
          <p className="mb-3 text-sm text-slate-200">Sector: {sector}</p>
          <p className="mb-3 text-sm text-slate-200">Instructor verificado</p>

          {/* Reseñas */}
          <div className="mb-2 flex items-center">
            <p className="mr-2 text-base font-medium text-slate-200">{rating}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < Math.floor(rating) ? '#FFD700' : '#E5E5E5'}
                  viewBox="0 0 24 24"
                  className="size-5">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-slate-200">{`(${reviews} reviews)`}</p>
          </div>
          <div className="flex items-center justify-between lg:mt-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} text={tag}></Badge>
              ))}
            </div>

            <Button
              // onClick={onRemove}
              className="hover:focus mt-auto"
              variant={'ghost'}
              size={'sm'}>
              {t('Eliminar')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
