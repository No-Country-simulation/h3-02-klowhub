import type { ReactNode } from 'react';
import { Link } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';

interface NavigatorProps {
  href: string;
  children: ReactNode;
  className?: string;
  bgImage: string;
  bgPosition?: string;
  bgSize?: string;
}
//background-size: 290% 175%;
//background-position: 3% 20%;

const Navigator = ({
  href,
  children,
  className = '',
  bgImage,
  bgPosition = '0% 0%',
  bgSize = '100% 100%',
}: NavigatorProps) => {
  return (
    <Link
      href={href}
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
      }}
      className={cn(
        'flex h-24 w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat p-4 text-center text-xl font-bold leading-10 text-white shadow-app-1',
        className
      )}>
      {children}
    </Link>
  );
};

export default Navigator;
