import Link from 'next/link';
import type { TranslationType } from '@core/types/translationType';
import SignupFormWrapper from './wrapper';
import { signupFields } from '../../constants/fields';

interface SignupFormProps {
  btnText: string;
  linkText: string;
  fieldsTranslate: TranslationType<string>;
}

export default function SignupForm({ btnText, linkText, fieldsTranslate }: SignupFormProps) {
  const fields = signupFields(fieldsTranslate);
  return (
    <div className="flex flex-col">
      <SignupFormWrapper btnText={btnText} fields={fields} />
      <Link
        className="hover:text-accent-100 text-sm font-medium transition-all ease-linear hover:underline"
        href="/signin">
        {linkText}
      </Link>
    </div>
  );
}
