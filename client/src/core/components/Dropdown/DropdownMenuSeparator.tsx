import { Separator } from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn('bg-muted -mx-1 my-1 h-px', className)} {...props} />
));
DropdownMenuSeparator.displayName = Separator.displayName;

export default DropdownMenuSeparator;
