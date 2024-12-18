'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import { FavIcon } from '@core/components/Icon/FavIcon';
import { StarRating } from '@core/components/StarRating';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import { useLocalCart } from '@features/cart/hooks/useLocalCart.ts';
import styles from './CourseCard.module.css';

interface CardProps {
  courseId?: string | number;
  title: string;
  description?: string;
  price?: string;
  rating: number;
  reviews?: number;
  tags: string[];
  imageSrc: string;
  imageAlt?: string;
  platform: string;
  viewDetails: string;
  addToCart: string;
  categoria: 'Curso' | 'Lección' | string;
  className?: string;
  eventsNone?: boolean;
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

const CourseCard = ({
  title,
  description,
  price,
  rating,
  reviews,
  tags,
  imageSrc,
  platform,
  viewDetails,
  addToCart,
  imageAlt = 'Imagen del curso',
  courseId = '',
  categoria,
  className = '',
  eventsNone = false,
}: CardProps) => {
  const styleClass = categoryStyles[categoria] || categoryStyles.default;
  const { isStored, saveToCart } = useLocalCart();

  return (
    <div
      className={cn(
        className,
        'relative flex flex-col rounded-lg border-2 border-[#21262f] bg-[#222934] shadow-app-1',
        styles.card,
        eventsNone && 'hover:!translate-y-0'
      )}>
      {/* Este link en absolute es el que navega hacia el detalle*/}
      <Link
        href={`/courses/${courseId}`}
        className={cn(
          'transparent absolute left-0 top-0 size-full text-[0px] text-transparent text-opacity-0',
          eventsNone && 'pointer-events-none select-none'
        )}>
        .
      </Link>
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
              imageAlt,
            })
          }
        />
      </div>

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={500}
        height={400}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
        {categoria}
      </span>

      <div className="grow p-4">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-2 max-h-14 min-h-14 text-ellipsis text-lg font-bold text-slate-200">
            {title}
          </h3>
        </div>

        <p className="mt-1 line-clamp-2 h-10 max-h-10 text-ellipsis pb-2 text-sm text-slate-200">
          {description ? description : 'No description'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 pb-2">
          <Button
            variant="neutral"
            asChild
            className="pointer-events-none cursor-default select-none rounded-lg"
            size="default">
            <div>
              <Image
                src={getPlatformLogo(platform)}
                alt={platform}
                width="20"
                height="20"
                className="mr-2"
              />
              {platform}
            </div>
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags?.map((tag, index) => <Badge key={index} text={tag}></Badge>)}
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            <p className="mr-2 text-slate-200">{rating}</p>
            <StarRating rating={rating} />
          </div>
          {reviews && reviews > 0 ? (
            <p className="ml-2 text-sm text-slate-200">({reviews} reviews)</p>
          ) : null}
        </div>
        {price ? (
          <div className="mt-4 flex items-center gap-2">
            <strong className="text-lg font-bold text-slate-200">${price}</strong>
          </div>
        ) : null}
      </div>

      <div className="mt-auto flex items-center p-4">
        <Button
          className="relative z-10 rounded-lg px-4 py-2 text-sm text-white"
          onClick={() => {
            console.log('Execute saveToCart', courseId);
            saveToCart({
              courseId,
              title,
              description: description || '',
              price: price || 0,
              platform,
              rating,
              reviews: reviews || 0,
              imageSrc,
              imageAlt,
            });
          }}>
          <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
          {addToCart}
        </Button>
        {/*<Button className="font-bold text-sm hover:underline ms-auto" variant="ghost">
          {viewDetails}
        </Button>*/}
      </div>
    </div>
  );
};

export default CourseCard;
