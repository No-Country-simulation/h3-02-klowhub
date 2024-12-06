import { ScrollDownButton } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof ScrollDownButton>,
  ComponentPropsWithoutRef<typeof ScrollDownButton>
>(({ className, ...props }, ref) => (
  <ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}>
    <div className="chevrondown size-4 opacity-50"></div>
  </ScrollDownButton>
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;

export default SelectScrollDownButton;
