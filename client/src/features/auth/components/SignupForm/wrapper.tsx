'use client';

import FormComponent from '@core/components/Form';
import type { FieldType } from '@core/models/fields.type';
import { signup } from '../../services/signup.service';
import AuthComplement from '../AuthcomplementForm/AuthComplement';
interface SigninFormWrapperProps {
  btnText: string;
  fields: FieldType[];
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButons: string;
}

export default function SignupFormWrapper({
  btnText,
  fields,
  text1,
  text2,
  text3,
  text4,
  textButons,
}: SigninFormWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <FormComponent
        id="signupForm"
        fields={fields}
        onSubmit={signup}
        className="mb-7 w-full items-center justify-center max-sm:max-w-[85%]">
        {isLoading => (
          <AuthComplement
            text1={text1}
            text2={text2}
            text3={text3}
            text4={text4}
            textButons={textButons}
            btnText={btnText}
            fields={fields}
            isLoading={isLoading}></AuthComplement>
        )}
      </FormComponent>
    </div>
  );
}
