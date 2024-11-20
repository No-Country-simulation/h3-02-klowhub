import { ItemIndicator, RadioItem } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}>
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ItemIndicator>
        <div className="size-2 rounded-full bg-neutral-100 fill-current shadow-app-1"></div>
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
));
DropdownMenuRadioItem.displayName = RadioItem.displayName;

export default DropdownMenuRadioItem;
