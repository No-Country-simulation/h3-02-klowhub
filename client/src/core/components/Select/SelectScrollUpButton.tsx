import { ScrollUpButton } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof ScrollUpButton>,
  ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}>
    <div className="chevronup size-4 opacity-50"></div>
  </ScrollUpButton>
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;

export default SelectScrollUpButton;
