'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { forwardRef, useState } from 'react';
import type { FormFieldProps } from '@core/types/fields';
import FormField from '../FormField';

interface PasswordFormField extends Omit<FormFieldProps, 'type'> {
  type: 'text' | 'password';
  activeForgot?: boolean;
}

const PasswordFormField = forwardRef<HTMLInputElement, PasswordFormField>(
  function PasswordFormField(
    { type = 'password', activeForgot = false, ...props }: PasswordFormField,
    ref
  ) {
    const t = useTranslations('Auth');
    const [inputType, setInputType] = useState<'text' | 'password' | null | undefined>(type);

    const handleTypeChange = (updatedType: 'text' | 'password') => {
      setInputType(updatedType);
    };

    return (
      <div className="group relative flex w-full max-w-lg items-center justify-center">
        <FormField
          {...props}
          ref={ref}
          type={inputType ?? 'password'}
          onTypeChange={handleTypeChange}
        />
        {activeForgot ? (
          <Link
            href="#"
            className="hover:text-accent-200 absolute -bottom-10 left-1/2 -translate-x-1/2 text-nowrap text-center text-sm transition-colors duration-300">
            {t('forgotPassword')}
          </Link>
        ) : null}
      </div>
    );
  }
);

export default PasswordFormField;
