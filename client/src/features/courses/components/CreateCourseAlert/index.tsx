import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@core/lib/utils';

interface CreateCourseAlertProps {
  className?: string;
  children: ReactNode;
}

export default function CreateCourseAlert({ children, className = '' }: CreateCourseAlertProps) {
  return (
    <div
      className={cn(
        'flex w-full min-w-[788px] max-w-2xl gap-x-3 rounded-lg bg-white/10 p-5',
        className
      )}>
      <Image src="/svg/alert-circle.svg" width={24} height={24} alt="Circle alert icon" />
      <p className="text-white">{children}</p>
    </div>
  );
}
