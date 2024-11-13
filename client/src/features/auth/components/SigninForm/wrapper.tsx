'use client';

import Button from '@core/components/Button';
import FormComponent from '@core/components/Form';
import type { FieldType } from '@core/types/fields';
import { signin } from '../../service/login.service';

interface SigninFormWrapperProps {
  btnText: string;
  fields: FieldType[];
}

export default function SigninFormWrapper({ btnText, fields }: SigninFormWrapperProps) {
  return (
    <FormComponent
      id="signinForm"
      fields={fields}
      onSubmit={signin}
      className="mb-7 w-full items-center justify-center max-sm:max-w-[85%]">
      {isLoading => (
        <Button
          type="submit"
          size="full"
          disabled={isLoading}
          className="focus-visible:outline-accent-50 mx-auto mt-[4.25rem] max-w-[380px] items-center justify-center focus-visible:outline-1 max-sm:max-w-[85%]"
          tabIndex={Number(fields.at(-1)?.tabindex || 0) + 1}>
          {btnText}
        </Button>
      )}
    </FormComponent>
  );
}
