'use client';

import { Link, usePathname } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';
import Button from '../Button';

interface UserModeToggleProps {
  platformText: string;
  homeText: string;
}

const PlatformToggle = ({ homeText, platformText }: UserModeToggleProps) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full max-h-[40px] items-center space-x-3 rounded-lg bg-white/20 p-2">
      <Button
        size="fit"
        variant="ghost"
        className={cn(
          'rounded-lg p-1 text-white transition-colors',
          pathname !== '/platform' && 'bg-primary-B-450 shadow-app-4'
        )}>
        <Link href="/">{homeText}</Link>
      </Button>
      <Button
        size="fit"
        variant="ghost"
        asChild
        className={cn(
          'rounded-lg p-1 text-white transition-colors',
          pathname === '/platform' && 'bg-primary-B-450 shadow-app-4'
        )}>
        <Link href="/platform">{platformText}</Link>
      </Button>
    </div>
  );
};

export default PlatformToggle;
