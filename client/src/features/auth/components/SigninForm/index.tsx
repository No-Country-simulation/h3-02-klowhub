import Link from 'next/link';
import type { TranslationType } from '@core/types/translationType';
import SigninFormWrapper from './wrapper';
import { signinField } from '../../constants/fields';

interface SigninFormProps {
  btnText: string;
  linkText: string;
  fieldsTranslate: TranslationType<string>;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButoons: string;
  textpreLinkin: string;
}

export default function SigninForm({
  btnText,
  linkText,
  fieldsTranslate,
  text1,
  text2,
  text3,
  text4,
  textButoons,
  textpreLinkin,
}: SigninFormProps) {
  const fields = signinField(fieldsTranslate);
  return (
    <div className="flex flex-col text-center text-white">
      <SigninFormWrapper
        text1={text1}
        text2={text2}
        text3={text3}
        text4={text4}
        textButoons={textButoons}
        btnText={btnText}
        fields={fields}
      />
      <p className="text-sm">
        {textpreLinkin}
        <Link
          className="hover:text-accent-100 text-sm font-medium transition-all ease-linear hover:underline"
          href="/signup">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
