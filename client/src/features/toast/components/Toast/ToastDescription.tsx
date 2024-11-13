import * as ToastPrimitives from '@radix-ui/react-toast';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../../../core/lib/utils';

const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export default ToastDescription;
