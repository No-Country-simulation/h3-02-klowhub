import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';

interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  id: string;
}

//Implementacion de Radix: https://www.radix-ui.com/primitives/docs/components/checkbox
const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, id, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      data-testid={id}
      id={id}
      className={cn(
        'peer h-5 w-5 shrink-0 rounded-[4px]',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'border border-[rgba(0,57,171,1)] bg-white',
        'data-[state=checked]:border-[rgba(209,148,226,1)] data-[state=checked]:bg-[rgba(112,36,134,1)]',
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="flex items-center justify-center" />
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Export default en componentes
export default Checkbox;
