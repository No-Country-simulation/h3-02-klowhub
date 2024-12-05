import { Indicator, Item } from '@radix-ui/react-radio-group';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';
import { cn } from '@core/lib/utils';

const RadioGroupItem = forwardRef<ElementRef<typeof Item>, ComponentPropsWithoutRef<typeof Item>>(
  ({ className, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={cn(
          'ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border border-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-B-300',
          className
        )}
        {...props}>
        <Indicator className="flex items-center justify-center">
          <div className="size-2.5 rounded-full bg-primary-B-300"></div>
        </Indicator>
      </Item>
    );
  }
);
RadioGroupItem.displayName = Item.displayName;

export default RadioGroupItem;
