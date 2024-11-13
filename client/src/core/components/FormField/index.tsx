import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/core/lib/utils';
import type { FormFieldProps } from '@/core/types/fields';
import EyeButton from '../EyeButton';

const formFieldCVA = cva(
  'autofill-inherit w-full bg-white/90 relative z-10 focus:outline-primary-B-500 placeholder:text-neutral-300 border-neutral-400 py-2 px-3  max-w-[350px] max-h-[75px] rounded-lg transition-all duration-300 ease border  border-solid text-sm leading-6 font-normal',
  {
    variants: {
      error: {
        true: '',
        false: '',
      },
      password: {
        true: 'pr-10',
        false: '',
      },
      defaultVariants: { error: false, password: false },
    },
  }
);

const labelCVA = cva('group relative w-full max-w-[350px] text-base font-normal leading-4', {
  variants: {
    error: {
      true: 'text-red-500',
      false: '',
    },
    defaultVariants: { error: false },
  },
});

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { className = '', id = '', type = 'text', error, onTypeChange, ...props },
  ref
) {
  return (
    <label data-testid={id} className={cn(labelCVA({ error: !!error }))} htmlFor={id}>
      <div className="relative mt-4">
        <input
          {...props}
          id={id}
          ref={ref}
          type={type}
          className={cn(formFieldCVA({ error: !!error, className, password: !!onTypeChange }))}
        />
        {onTypeChange ? <EyeButton onTypeChange={onTypeChange} /> : null}
      </div>
      {error ? (
        <span className="absolute -bottom-5 left-0 text-xs text-red-400">{error}</span>
      ) : null}
    </label>
  );
});

export default FormField;
