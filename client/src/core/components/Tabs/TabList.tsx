'use client';

import { List } from '@radix-ui/react-tabs';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const TabsList = forwardRef<ElementRef<typeof List>, ComponentPropsWithoutRef<typeof List>>(
  ({ className, ...props }, ref) => (
    <List
      ref={ref}
      className={cn(
        'bg-muted group inline-flex h-10 w-full items-center justify-center rounded-md py-1',
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = 'TabsList';

export default TabsList;
