'use server';
import { cookies } from 'next/headers';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';
import { validateSchema } from '@core/services/validateSchema';
import type { ActionResponse } from '@core/types/actionResponse';
import env from '@root/env.config';
import { signinSchema } from '../validation/schemas';

export async function signin(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const t = await getTranslations('Validations'); // Obtener las traducciones
  const schema = signinSchema(t);
  const [error, data] = validateSchema(schema, {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  });

  if (error || !data) return error;
  let res;
  const URL = `${env.API_URL}/auth/login`;
  try {
    res = await fetch(`${env.API_URL}/auth/login`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Error en la solicitud de inicio de sesión');
    }
  } catch {
    return { errors: { GLOBAL: 'Error en la solicitud de inicio de sesión', URL } };
  }

  const dta = await res.json();
  const hastoken = dta instanceof Object && 'token' in dta;
  const hassuccess = dta instanceof Object && 'success' in dta; // Ahora TypeScript reconoce `token`
  console.log(dta);
  if (hassuccess && !dta?.success) {
    return { errors: { GLOBAL: 'Error en la solicitud de inicio de sesión', URL } };
  }
  const dtoken = hastoken ? (dta?.token as string) : ''; // Ahora TypeScript reconoce `token`
  console.log(dtoken);

  if (!dtoken) {
    return { errors: { GLOBAL: 'No se recibió un token de autenticación', URL } };
  }

  (await cookies()).set('auth_token', dtoken);

  const locale = await getLocale();
  redirect({ href: { pathname: '/platform' }, locale });
}
