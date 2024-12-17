'use server';
import { getLocale, getTranslations } from 'next-intl/server';
import { redirect } from '@core/lib/i18nRouting';
import { validateSchema } from '@core/services/validateSchema';
import type { ActionResponse } from '@core/types/actionResponse';
import { signinSchema } from '../validation/schemas';

export async function signin(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const t = await getTranslations('Validations');
  const schema = signinSchema(t);
  const [error, data] = validateSchema(schema, {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  });

  // Si hay error de validación, retornar el error
  if (error || !data) return error;

  // Datos estáticos de validación (ejemplo)
  const validCredentials = {
    email: 'user@hackaton.com',
    password: '12345',
  };

  // Validar las credenciales estáticas
  if (data.email === validCredentials.email && data.password === validCredentials.password) {
    // Redirigir al usuario a la página principal o plataforma después del login exitoso
    const locale = await getLocale(); // Obtener el locale actual
    redirect({ href: { pathname: '/platform' }, locale }); // Redirigir con el locale

    return {
      status: 'success',
    };
  } else {
    // Si las credenciales son incorrectas, devolvemos un error con 'status' y 'message'
    return {
      status: 'failed', // Indica que el login falló
      errors: { GLOBAL: 'Credenciales incorrectas' }, // Usamos 'errors' para devolver el mensaje de error
    };
  }
}
