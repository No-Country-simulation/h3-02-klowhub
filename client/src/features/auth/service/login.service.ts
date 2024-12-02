import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';
import { validateSchema } from '@core/services/validateSchema';
import type { ActionResponse } from '@core/types/actionResponse';
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

  const res = await fetch('http://localhost:3000/auth/login', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  //console.log(res);
  //const dataRes = await res.json();
  const cookieHeader = res.headers.get('Set-Cookie');
  if (!cookieHeader) {
    return { errors: { GLOBAL: 'Error al crear la cuenta' } };
  }
  //console.log(cookieHeader);

  const locale = await getLocale();
  redirect({ href: { pathname: '/platform' }, locale });
}
