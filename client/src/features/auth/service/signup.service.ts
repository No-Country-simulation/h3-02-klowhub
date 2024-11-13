import { getTranslations } from 'next-intl/server';
import { randomUUID } from 'crypto';
import { apiService } from '@/core/services/api.service';
import { validateSchema } from '@/core/services/validateSchema';
import type { ActionResponse } from '@/core/types/actionResponse';
import { signupSchema } from '../validation/schemas';

export async function signup(
  _state: unknown,
  formData: FormData
): Promise<ActionResponse | undefined> {
  const t = await getTranslations();
  const schema = signupSchema(t);
  const [error, data] = validateSchema(schema, {
    email: formData.get('email')?.toString() || '',
    password: formData.get('password')?.toString() || '',
  });

  if (error || !data) return error;

  const [errorRes, dataRes] = await apiService.post('/signup', data);

  if (errorRes) {
    return {
      traceId: randomUUID(),
      status: 'FETCH_ERROR',
      errors: {
        GLOBAL: 'Error al crear la cuenta',
      },
    };
  }
  // Manejar respuesta aqui
  console.log({ dataRes });
  //redirect(`/siguiente-ruta`);
}
