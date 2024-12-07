import Image from 'next/image';
import Link from 'next/link';
import Button from '@core/components/Button';
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
        {text1}{' '}
        <Link
          href="/help/terms-and-conditions"
          target="_blank"
          className="text-blue-400 transition-all ease-linear hover:underline">
          {' '}
          {text2}{' '}
        </Link>{' '}
        {text3}{' '}
        <Link
          href="/help/terms-and-conditions"
          target="_blank"
          className="text-blue-400 transition-all ease-linear hover:underline">
          {text4}{' '}
        </Link>
      </p>
      <Button
        type="submit"
        size="full"
        disabled={isLoading}
        className="focus-visible:outline-accent-50 mx-auto mt-5 max-w-[380px] items-center justify-center py-[1.35rem] max-sm:max-w-[85%]"
        tabIndex={Number(fields.at(-1)?.tabindex || 0) + 1}>
        {btnText}
      </Button>
      <div className="flex flex-col items-center gap-6">
        <p className="text-sm font-bold text-white">{textButoons}</p>
        <div className="flex flex-row gap-6 opacity-70">
          <Button variant="ghost" size="fit" disabled className="pointer-events-none select-none">
            <Image
              src="/svg/github.svg"
              width={50}
              height={50}
              alt="github"
              className="rounded-full border border-white p-2"
            />
          </Button>
          <Button variant="ghost" size="fit" disabled className="pointer-events-none select-none">
            <Image
              src="/svg/facebook.svg"
              width={50}
              height={50}
              alt="github"
              className="rounded-full border border-white p-2"
            />
          </Button>
          <Button variant="ghost" size="fit" disabled className="pointer-events-none select-none">
            <Image
              src="/svg/google.svg"
              width={50}
              height={50}
              alt="google"
              className="rounded-full border border-white p-2"
            />
          </Button>
        </div>
      </div>
      {/*
      <div className="row flex items-center justify-center text-sm text-white">
        <FormCheckbox
          label="Quiero recibir novedades y consejos de la plataforma"
          id="my-checkbox"
          name="my-checkbox-name"
          defaultValue="false"
        />
      </div>
      */}
    </div>
  );
}

export default AuthComplement;
