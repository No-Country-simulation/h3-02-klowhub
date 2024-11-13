import type { InputHTMLAttributes } from 'react';

export type OnTypeChangeType = (param: 'text' | 'password') => void;
export type InputFieldsTypes = 'text' | 'password' | 'email' | 'date' | 'tell' | 'date' | 'url';

export interface FieldType {
  id: string;
  name: string;
  type: InputFieldsTypes;
  autoComplete?: string;
  defaultValue?: string;
  placeholder?: string;
  tabindex?: number;
  activeForgot?: boolean;
  items?: unknown[];
}

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  className?: string;
  type?: InputFieldsTypes;
  error?: string;
  onTypeChange?: OnTypeChangeType;
}
