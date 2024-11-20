'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '@core/components/Button';
import FormComponent from '@core/components/Form';
import type { FieldType } from '@core/types/fields';
import FormCheckbox from '@root/src/core/components/FormCheckbox/Index';
import { signin } from '../../service/login.service';

interface SigninFormWrapperProps {
  btnText: string;
  fields: FieldType[];
}

export default function SigninFormWrapper({ btnText, fields }: SigninFormWrapperProps) {
  return (
    <div className="text-white">
      <FormComponent
        id="signinForm"
        fields={fields}
        onSubmit={signin}
        className="mb-7 w-full items-center justify-center max-sm:max-w-[85%]">
        {isLoading => (
          <>
            <p className="mt-6 text-xs font-medium text-white">
              Al registrarte, aceptas nuestras
              <Link href="/forgot-password">Codiciones de uso</Link>y nuestra
              <Link href="/forgot-password">Politica de publicidad</Link>
            </p>
            <Button
              type="submit"
              size="full"
              disabled={isLoading}
              className="focus-visible:outline-accent-50 mx-auto mt-5 max-w-[380px] items-center justify-center text-sm font-semibold focus-visible:outline-1 max-sm:max-w-[85%]"
              tabIndex={Number(fields.at(-1)?.tabindex || 0) + 1}>
              {btnText}
            </Button>
            <div className="flex flex-col items-center gap-6">
              <p className="text-sm font-bold text-white">O a continuación</p>
              <div className="flex flex-row gap-6">
                <Image
                  src="/svg/github.svg"
                  width={50}
                  height={50}
                  alt="github"
                  className="rounded-full border border-white p-2"
                />
                <Image
                  src="/svg/github.svg"
                  width={50}
                  height={50}
                  alt="github"
                  className="rounded-full border border-white p-2"
                />
                <Image
                  src="/svg/google.svg"
                  width={50}
                  height={50}
                  alt="google"
                  className="rounded-full border border-white p-2"
                />
              </div>
            </div>
            <div className="row flex items-center justify-center text-sm text-white">
              <FormCheckbox
                onChange={event => {}}
                label="Quiero recibir novedades y consejos de la plataforma"
                id="my-checkbox"
                isCheked={false}
                name="my-checkbox-name"
              />
            </div>
          </>
        )}
      </FormComponent>
    </div>
  );
}
