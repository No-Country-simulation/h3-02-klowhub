'use client';

import FormComponent from '@core/components/Form';
import type { FieldType } from '@core/types/fields';
import { signup } from '../../service/signup.service';
import AuthComplement from '../AuthcomplementForm/AuthComplement';
interface SigninFormWrapperProps {
  btnText: string;
  fields: FieldType[];
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  textButoons: string;
}

export default function SignupFormWrapper({
  btnText,
  fields,
  text1,
  text2,
  text3,
  text4,
  textButoons,
}: SigninFormWrapperProps) {
  return (
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
          textButoons={textButoons}
          btnText={btnText}
          fields={fields}
          isLoading={isLoading}></AuthComplement>
      )}
    </FormComponent>
  );
}
