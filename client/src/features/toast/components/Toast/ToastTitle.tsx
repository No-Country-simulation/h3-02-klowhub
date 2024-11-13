import * as ToastPrimitives from '@radix-ui/react-toast';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '../../../../core/lib/utils';

const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

export default ToastTitle;
