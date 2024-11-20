import Link from 'next/link';
import type { TranslationType } from '@core/types/translationType';
import SigninFormWrapper from './wrapper';
import { signinField } from '../../constants/fields';

interface SigninFormProps {
  btnText: string;
  linkText: string;
  fieldsTranslate: TranslationType<string>;
}

export default function SigninForm({ btnText, linkText, fieldsTranslate }: SigninFormProps) {
  const fields = signinField(fieldsTranslate);
  return (
    <div className="flex flex-col text-center text-white">
      <SigninFormWrapper btnText={btnText} fields={fields} />
      <p className="text-sm">
        {' '}
        No tienes cuenta ?{' '}
        <Link
          className="hover:text-accent-100 text-sm font-medium transition-all ease-linear hover:underline"
          href="/signup">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
