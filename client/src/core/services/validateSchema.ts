 
import { z } from 'zod';
import { randomUUID } from 'crypto';
import type { ActionResponse } from '../models/actionResponse.type';

/**
 * Validacion generica de esquema de zod
 *
 * @param schema Esquema de zod a validar
 * @param data   Objeto a validar (Debe de contener los datos validos para el esquema)
 * @returns      [error, data] | error @type {ActionResponse} | data @type {z.infer<T>} El objeto validado
 */
export const validateSchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: z.infer<T>
): [ActionResponse | undefined, z.infer<T> | undefined] => {
  const schemaVerified = schema.safeParse(data);
  if (!schemaVerified.success) {
    const errors = Object.fromEntries(
      schemaVerified.error.errors
        .filter(({ path }) => path)
        .map(({ path, message }) => [path[0], message])
    );
    return [
      {
        traceId: randomUUID(),
        status: 'VALIDATION_ERROR',
        errors,
      },
      undefined,
    ];
  }
  return [undefined, schemaVerified.data];
};
