import Image from 'next/image';
import FavButton from '@core/components/FavButton/FavButton';
import { cn } from '@core/lib/utils';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import appSheet from '/public/images/appsheet_logo.png';
import moreVertical from '/public/svg/moreVertical.svg';
import _powerApp from '/public/svg/powerapp.svg';
import star from '/public/svg/star.svg';
import link from '/public/svg/link.svg';

interface RecommendProjectCardProps {
  profile: string;
  published: string;
  title: string;
  subTitle?: string;
  tags: string[];
  platform: string;
  ownerName: string;
  ownerHeader: string;
  ratingText: string;
  rating: number;
  viewDetails: string;
  className?: string;
}

export default function RecommendProjectCard({
  profile,
  published,
  title,
  subTitle,
  tags,
  platform,
  ownerName,
  ownerHeader,
  ratingText,
  rating,
  viewDetails,
  className = '',
}: RecommendProjectCardProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-lg bg-neutral-100 p-3 shadow-app-1',
        className
      )}>
      <div className="space-y-4 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{published}</span>
          <div className="relative flex gap-2">
            <Button variant="ghost" size="fit" className="size-8 hover:bg-white/10">
              <Image src={link} width={16} height={16} alt="AppSheet" className="size-4" />
            </Button>
            <FavButton />
            <Button variant="ghost" size="fit" className="size-8 hover:bg-white/10">
              <Image src={moreVertical} width={16} height={16} alt="AppSheet" className="size-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold leading-tight text-white">{title}</h2>
          <p className="text-sm text-gray-400">{subTitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} text={tag} />
          ))}
        </div>
        <Button variant="neutral" size="fit" asChild>
          <div className="flex items-center gap-2 rounded-lg p-2">
            <Image src={appSheet} width={24} height={24} alt="AppSheet" className="size-6" />
            <span className="text-sm text-white">{platform}</span>
          </div>
        </Button>
      </div>
      <div className="space-y-4 p-3">
        <div className="flex items-center gap-3">
          <div className="size-10 overflow-hidden rounded-full bg-gray-600">
            <Image
              src={profile}
              width={50}
              height={50}
              alt="Profile image"
              className="max-w-full rounded-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{ownerName}</span>
              <Badge text="PRO" variant="pro" />
            </div>
            <span className="text-sm text-gray-400">{ownerHeader}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Image src={star} width={16} height={16} alt="Star" className="size-4" />
          <span className="text-sm text-gray-400">
            {ratingText}: {rating}
          </span>
        </div>
      </div>
      <div className="p-3">
        <Button variant="ghost" className="w-full text-primary-B-300 hover:bg-white/10">
          {viewDetails}
        </Button>
      </div>
    </div>
  );
}
