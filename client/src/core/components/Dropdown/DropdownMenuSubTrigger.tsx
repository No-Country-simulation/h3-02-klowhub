import { SubTrigger } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import chevron from '/public/svg/chevronRight.svg';

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof SubTrigger>,
  ComponentPropsWithoutRef<typeof SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <SubTrigger
    ref={ref}
    className={cn(
      'focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      inset && 'pl-8',
      className
    )}
    {...props}>
    {children}
    <Image src={chevron} alt="Chevron" width={16} height={16} className="ml-auto" />
  </SubTrigger>
));
DropdownMenuSubTrigger.displayName = SubTrigger.displayName;

export default DropdownMenuSubTrigger;
