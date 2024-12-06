import { Icon, Trigger } from '@radix-ui/react-select';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';

const SelectTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'border-input bg-background placeholder:text-muted-foreground flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus-visible:outline-none active:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}>
    {children}
    <Icon asChild>
      <div className="chevrondown size-4 opacity-50"></div>
    </Icon>
  </Trigger>
));
SelectTrigger.displayName = Trigger.displayName;

export default SelectTrigger;
