import Link from 'next/link';
import type { TranslationType } from '@core/models/translationType.type';
import SignupFormWrapper from './wrapper';
import { signupFields } from '../../models/fields.model';

interface SignupFormProps {
  btnText: string;
  linkText: string;
  fieldsTranslate: TranslationType<string>;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButons: string;
  textpreLink: string;
}

export default function SignupForm({
  btnText,
  linkText,
  fieldsTranslate,
  text1,
  text2,
  text3,
  text4,
  textButons,
  textpreLink,
}: SignupFormProps) {
  const fields = signupFields(fieldsTranslate);
  return (
    <div className="flex flex-col text-center text-sm font-normal text-white">
      <SignupFormWrapper
        text1={text1}
        text2={text2}
        text3={text3}
        text4={text4}
        textButons={textButons}
        btnText={btnText}
        fields={fields}
      />
      <p>
        {textpreLink}
        <Link
          className="hover:text-accent-100 text-sm font-medium transition-all ease-linear hover:underline"
          href="/signin">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
