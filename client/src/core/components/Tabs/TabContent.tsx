'use client';

import { Content } from '@radix-ui/react-tabs';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const TabsContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export default TabsContent;
