/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import css from './navigator.module.css';

interface NavigatorProps {
  href: string;
  children: ReactNode;
  className?: string;
  bgImage: string;
  bgPosition?: string;
  bgSizeWidth?: string;
  bgSizeHeight?: string;
}

const Navigator = ({
  href,
  children,
  className = '',
  bgImage,
  bgPosition = '0% 0%',
  bgSizeWidth = '100%',
  bgSizeHeight = '100%',
}: NavigatorProps) => {
  return (
    <Link
      href={href}
      style={
        {
          '--navigator-bg-image': `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
          '--navigator-bg-position': bgPosition,
          '--navigator-bg-image-width': bgSizeWidth,
          '--navigator-bg-image-height': bgSizeHeight,
        } as any
      }
      className={cn(
        'flex h-24 w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-4 text-center text-lg font-bold leading-10 text-white shadow-app-1 min-[580px]:text-xl',
        css.navigatorBg,
        className
      )}>
      {children}
    </Link>
  );
};

export default Navigator;
