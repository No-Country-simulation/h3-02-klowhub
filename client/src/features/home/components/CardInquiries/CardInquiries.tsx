import Image from 'next/image';
import { cn } from '@core/lib/utils';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import styles from './cardInquiries.module.css';
import { cardSkeletonBlur } from '../../models/cardSkeleton.blur';

export interface CardInquiriesProps {
  title: string;
  description: string;
  name: string;
  date: string;
  state: string;
  imageUrl: string;
  platform: string;
  imageEstado: string;
  className?: string;
}

export default function CardInquiries({
  title,
  description,
  name,
  date,
  state,
  imageUrl,
  platform,
  imageEstado,
  className = '',
}: CardInquiriesProps) {
  cn(
    'flex flex-row rounded-xl px-2 py-1 text-xs font-semibold',
    state === 'completed' ? 'bg-white text-success-400' : 'bg-yellow-200 text-yellow-600'
  );
  return (
    <div
      className={cn(
        'max-w-[400px] rounded-lg bg-white/10 shadow-md',
        styles.gridContainer,
        className
      )}>
      <div className={cn('flex flex-col justify-center', styles.titleDescription)}>
        <h3 className="font-inter decoration-none text-left text-sm font-semibold leading-5 tracking-tighter text-white underline-offset-4">
          {title}
        </h3>
        <p className="font-inter decoration-none text-left text-sm font-semibold leading-5 tracking-tighter text-white underline-offset-4">
          {description}
        </p>
      </div>

      <div className={styles.firstRowContainer}>
        <div className={cn('flex items-center md:justify-self-center', styles.photoName)}>
          <Image
            src={imageUrl}
            width={50}
            height={50}
            alt={name}
            className="mr-[24px] rounded-full bg-white object-cover"
            placeholder="blur"
            blurDataURL={cardSkeletonBlur}
            aria-label={name}
          />
          <p className="text-left text-sm text-white">{name}</p>
        </div>

        <div className={cn('flex items-center md:justify-self-center', styles.fecha)}>
          <p className="text-left text-sm font-semibold text-white">{date}</p>
        </div>

        <div
          className={cn(
            'flex items-center rounded-lg bg-primary-B-500/10 md:justify-self-center',
            styles.logoState
          )}>
          <Image
            src={getPlatformLogo(platform)}
            width={25}
            height={25}
            alt={name}
            className="md:mr-[9px]"
          />
          <p className="font-inter decoration-none text-left text-xs font-semibold leading-5 tracking-tighter text-white underline-offset-4">
            {platform}
          </p>
        </div>

        <div className={cn('flex items-center md:justify-self-center', styles.state)}>
          <span
            className={cn(
              'flex flex-row rounded-xl px-2 py-1 text-xs font-semibold',
              state === 'completed' ? 'bg-white text-success-400' : 'bg-yellow-200 text-yellow-600'
            )}>
            <Image
              src={imageEstado}
              alt={name}
              width={20}
              height={20}
              className="justify-self-center p-1"
            />
            <p className="flex items-center p-1">{state}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
