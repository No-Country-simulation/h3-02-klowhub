'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import { FavIcon } from '@core/components/Icon/FavIcon.tsx';
import { StarRating } from '@core/components/StarRating/index.tsx';
import { Link } from '@core/lib/i18nRouting.ts';
import { getPlatformLogo } from '@core/services/getPlatformLogo.ts';
import { useLocalCart } from '@features/cart/hooks/useLocalCart.ts';

interface CourseHorizontalCardProps {
  courseId: string | number;
  imageSrc: string;
  title: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  textButton: string;
  platform: string;
  categoria: string;
  viewDetails: string;
  addToCartText: string;
  price: string | number;
}

const categoryStyles: Record<string, string> = {
  Curso: 'bg-purple-200 text-purple-800',
  Lección: 'bg-green-200 text-green-800',
  default: 'bg-gray-200 text-gray-800',
};

const FavButton = dynamic(() => import('../../../../core/components/FavButton/FavButton.tsx'), {
  ssr: false,
  loading: () => <FavIcon />,
});

const CourseHorizontalCard = ({
  imageSrc,
  title,
  description,
  rating,
  reviews,
  textButton,
  platform,
  tags,
  categoria,
  viewDetails,
  courseId,
  price,
  addToCartText,
}: CourseHorizontalCardProps) => {
  const styleClass = categoryStyles[categoria] || categoryStyles.default;
  const { isStored, saveToCart } = useLocalCart();

  return (
    <div className="mt-6 flex h-auto w-full flex-col items-center overflow-hidden rounded-lg bg-[#222934] shadow-lg md:h-[315px] md:flex-row md:items-stretch">
      {/* Imagen */}
      <div className="relative h-[200px] w-full flex-none md:h-auto md:w-1/3">
        <Image
          src={imageSrc}
          width={500}
          height={300}
          alt="Product"
          className="size-full object-cover object-center"
        />
        <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
          {categoria}
        </span>
        <div className="bg-white/8 !absolute right-3 top-2 size-[24px] rounded-[12px]">
          <FavButton
            color="white"
            variant="filled"
            className="block drop-shadow-[6px_4px_14px_black]"
            isFavoriteStored={isStored(courseId)}
            saveToCart={() =>
              saveToCart({
                courseId,
                title,
                description: description || '',
                price: price || 0,
                platform,
                rating,
                reviews: reviews || 0,
                imageSrc,
                imageAlt: title,
              })
            }
          />
        </div>
      </div>

      {/* Contenedor de detalles y menú de 3 puntos */}
      <div className="relative flex flex-1 flex-col p-4">
        {/* Detalles */}
        <div className="relative mb-2">
          <h1 className="mb-2 text-lg font-bold text-slate-200 md:text-xl">{title}</h1>
          <p className="mb-4 text-sm text-slate-200 md:text-base">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2 pb-2">
            <Button
              asChild
              variant="neutral"
              className="pointer-events-none cursor-default select-none rounded-lg"
              size="default">
              <div>
                <Image
                  src={getPlatformLogo(platform)}
                  alt="Carrito"
                  width="20"
                  height="20"
                  className="mr-2"
                />
                {textButton}
              </div>
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 pb-4">
            {tags.map((tag, index) => (
              <Badge key={index} text={tag}></Badge>
            ))}
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="mr-2 text-slate-200">{rating}</p>
              <StarRating rating={rating} />
            </div>
            <p className="ml-2 text-sm text-slate-200">{`(${reviews} reviews)`}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center">
          <Button
            className="relative z-10 rounded-lg px-4 py-2 text-sm text-white"
            onClick={() =>
              saveToCart({
                courseId,
                title,
                description: description || '',
                price: price || 0,
                platform,
                rating,
                reviews: reviews || 0,
                imageSrc,
                imageAlt: title,
              })
            }>
            <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
            {addToCartText}
          </Button>
          <Button
            asChild
            className="ml-4 text-sm font-bold text-white hover:underline"
            variant="ghost">
            <Link href={`/courses/${courseId}`}>{viewDetails}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseHorizontalCard;
