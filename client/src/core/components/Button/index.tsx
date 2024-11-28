import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/core/lib/utils';

//Class Variant Authority es una forma declarativa de manejar variantes de componentes
//Te asegura un estilo inicial, y al momento de usar las variantes evitas choques de clases
//Ver docs: https://cva.style/docs
const btnStyle = cva(
  'inline-flex items-center justify-center no-underline truncate disabled:opacity-60 disabled:cursor-default text-white transition-colors duration-200 ease-in-out rounded-lg',
  {
    variants: {
      variant: {
        default:
          'bg-primary-B-500 border border-primary-B-500 hover:border-primary-B-500/80  hover:bg-primary-B-500/70 active:border-primary-B-600 active:bg-primary-B-600',
        outline:
          'bg-transparent border border-primary-B-200 hover:border-primary-B-300 hover:bg-primary-B-200/5 active:bg-primary-B-200/10 text-primary-B-200 data-[state=current]:bg-primary-B-200',
        'outline-light':
          'bg-transparent border border-primary-A-100 text-primary-A-100 data-[state=current]:bg-primary-A-100',
        ghost: 'bg-transparent no-outline text-primary-B-200',
        neutral: 'bg-white/10 border border-white/10',
      },
      size: {
        default: 'h-9 px-4 py-5',
        sm: 'h-9 px-1',
        lg: 'h-9 py-6 px-8',
        fit: 'size-fit',
        full: 'h-9 px-2 py-4 w-full max-w-[100cqw]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnStyle> {
  'data-testid'?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  //Slot es un componente que nos permite transforma un elemento en otro
  //Ver WEB MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/slot
  //Radix implementacion: https://www.radix-ui.com/primitives/docs/utilities/slot
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(btnStyle({ variant, size, className }))} ref={ref} {...props} />;
});

// Export default en componentes
export default Button;
