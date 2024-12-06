import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@core/lib/utils';
import type { FormFieldProps } from '@core/types/fields';
import EyeButton from '../EyeButton';

const formFieldCVA = cva(
  'relative z-10 border-neutral-400 bg-white/90 px-3 py-2 border border-solid rounded-lg w-full font-normal autofill-inherit focus:outline-primary-B-500 max-w-[350px] max-h-[75px] text-sm placeholder:text-neutral-300 leading-6 transition-all duration-300 ease autofill-inherit',
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

const labelCVA = cva('relative w-full max-w-[350px] font-normal text-base leading-4 group', {
  variants: {
    error: {
      true: 'text-red-500',
      false: '',
    },
    defaultVariants: { error: false },
  },
});

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { className = 'text-black', id = '', type = 'text', error, onTypeChange, label, ...props },
  ref
) {
  return (
    <label data-testid={id} className={cn(labelCVA({ error: !!error }))} htmlFor={id}>
      {label ? <span className="text-base font-medium text-white">{label}</span> : null}
      <div className="relative mt-4 text-black">
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
