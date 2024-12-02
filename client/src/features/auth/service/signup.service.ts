import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';
import { validateSchema } from '@core/services/validateSchema';
import type { ActionResponse } from '@core/types/actionResponse';
import { signupSchema } from '../validation/schemas';

export async function signup(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const t = await getTranslations('Validations');
  const schema = signupSchema(t);
  const [error, data] = validateSchema(schema, {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  });

  if (error || !data) return error;

  const res = await fetch('http://localhost:3000/auth/register', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  //console.log(res);
  //const dataRes = await res.json();
  //const cookieHeader = res.headers.get('Set-Cookie');
  //console.log(cookieHeader);
  // Manejar respuesta aqui
  console.log({ res });
  const locale = await getLocale();
  redirect({ href: { pathname: '/platform' }, locale });
}
