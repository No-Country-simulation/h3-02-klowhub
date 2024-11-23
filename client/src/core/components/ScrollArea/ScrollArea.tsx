import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import ScrollBar from './ScrollBar';
import { cn } from '../../lib/utils';

const ScrollArea = forwardRef<ElementRef<typeof Root>, ComponentPropsWithoutRef<typeof Root>>(
  ({ className, children, ...props }, ref) => (
    <Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
      <Viewport className="size-full rounded-[inherit]">{children}</Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  )
);
ScrollArea.displayName = Root.displayName;

export default ScrollArea;
