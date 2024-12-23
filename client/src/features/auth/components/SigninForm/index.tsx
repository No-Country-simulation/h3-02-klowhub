import { Link } from '@core/lib/i18nRouting';
import type { TranslationType } from '@core/models/translationType.type';
import { ToastContainer } from '@features/toast/provider/ToastContainer';
import StaticLoginForm from './StaticLoginForm';
import SigninFormWrapper from './wrapper';
import { signinField } from '../../models/fields.model';

interface SigninFormProps {
  btnText: string;
  linkText: string;
  fieldsTranslate: TranslationType<string>;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButons: string;
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
  textButons,
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
        textButons={textButons}
        btnText={btnText}
        fields={fields}
      />
      <div className="flex items-center justify-center">
        <ToastContainer>
          <StaticLoginForm />
        </ToastContainer>
      </div>
      <p className="space-x-2 text-sm">
        <span>{textpreLinkin}</span>
        <Link
          className="hover:text-accent-100 text-sm font-medium text-blue-400 transition-all ease-linear hover:underline"
          href="/signup">
          {linkText}
        </Link>
      </p>
    </div>
  );
}
