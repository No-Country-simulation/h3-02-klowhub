import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '@core/components/Button';
import FormCheckbox from '@core/components/FormCheckbox/Index';
import type { FieldType } from '@core/types/fields';

interface AuthComplementProps {
  btnText: string;
  fields: FieldType[];
  isLoading: boolean;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButoons: string;
}

function AuthComplement(AuthComplementProps: AuthComplementProps) {
  const { btnText, fields, isLoading, text1, text2, text3, text4, textButoons } =
    AuthComplementProps;
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="mt-6 text-xs font-medium text-white">
        {text1} <Link href="/"> {text2} </Link> {text3} <Link href="/">{text4} </Link>
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
        <p className="text-sm font-bold text-white">{textButoons}</p>
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
    </div>
  );
}

export default AuthComplement;
