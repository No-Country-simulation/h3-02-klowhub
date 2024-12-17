'use server';
import { cookies } from 'next/headers';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';
import { validateSchema } from '@core/services/validateSchema';
import type { ActionResponse } from '@core/types/actionResponse';
import {API_URL} from '@root/env.config';
import { signupSchema } from '../validation/schemas';
export async function signup(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const t = await getTranslations('Validations');
  const schema = signupSchema(t);
  const [error, data] = validateSchema(schema, {
    email: formData.get('email')?.toString() || '',
    firstName: formData.get('firstName')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  });

  if (error || !data) return error;
  console.log(JSON.stringify(data));

  const res = await fetch(`${API_URL}/auth/register`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  console.log(res);
  const dta = await res.json();
  const hastoken = dta instanceof Object && 'token' in dta;
  const hassuccess = dta instanceof Object && 'success' in dta; // Ahora TypeScript reconoce `token`
  console.log(dta);
  if (hassuccess && !dta?.success) {
    return { errors: { GLOBAL: 'Error en la solicitud de inicio de sesión' } };
  }
  const dtoken = hastoken ? (dta?.token as string) : ''; // Ahora TypeScript reconoce `token`
  console.log(dtoken);

  if (!dtoken) {
    return { errors: { GLOBAL: 'No se recibió un token de autenticación' } };
  }

  (await cookies()).set('auth_token', dtoken);

  const locale = await getLocale();
  redirect({ href: { pathname: '/platform' }, locale });
}
