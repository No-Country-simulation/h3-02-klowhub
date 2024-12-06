import type { ReactNode } from 'react';
import { cn } from '@core/lib/utils';

interface CreateCourseFormProps {
  className?: string;
  title: string;
  children: ReactNode;
}

export default function CreateFormPart({ children, title, className = '' }: CreateCourseFormProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-medium text-white">{title}</h3>
      {children}
    </div>
  );
}
