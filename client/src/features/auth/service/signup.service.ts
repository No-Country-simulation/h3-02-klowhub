'use server';
import { cookies } from 'next/headers';
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

  if (!res.ok) {
    return { errors: { GLOBAL: 'Error en la solicitud de inicio de sesión' } };
  }

  const cookieHeader = res.headers.get('set-cookie');

  if (!cookieHeader) {
    return { errors: { GLOBAL: 'No se recibió un token de autenticación' } };
  }
  const tokenMatch = cookieHeader.match(/auth_token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    return { errors: { GLOBAL: 'No se pudo extraer el token de autenticación' } };
  }
  (await cookies()).set('auth_token', token);
  console.log('Set-Cookie:', cookieHeader);
  console.log('Token extraído:', token);

  const locale = await getLocale();
  redirect({ href: { pathname: '/platform' }, locale });
}
