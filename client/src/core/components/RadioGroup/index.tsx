'use client';

import { Root } from '@radix-ui/react-radio-group';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';
import RadioGroupItem from './RadioGroupItem';

const RadioGroup = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, ...props }, ref) => {
    return <Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
  }
);
RadioGroup.displayName = Root.displayName;

export { RadioGroup, RadioGroupItem };
