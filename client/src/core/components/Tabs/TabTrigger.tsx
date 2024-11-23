'use client';

import { Trigger } from '@radix-ui/react-tabs';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

import { cn } from '../../lib/utils';

const TabsTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'inline-flex grow items-center justify-center whitespace-nowrap border-b border-white px-3 py-1.5 text-base font-medium text-white transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:grow-[0.25] data-[state=active]:border-primary-B-300 data-[state=active]:text-primary-B-300',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export default TabsTrigger;
