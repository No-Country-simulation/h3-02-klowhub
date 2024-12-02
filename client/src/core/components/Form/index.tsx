'use client'; //Use client necesario por usar hooks y eventos como useState,useFormState,onSubmit(Solo disponibles en el cliente)

import { type FormEvent, type ReactNode, useActionState, useEffect, useTransition } from 'react';
import { cn } from '@core/lib/utils';
import type { ActionResponse, OnSubmitType } from '@core/types/actionResponse';
import type { FieldType } from '@core/types/fields';
import RenderFields from '../RenderFields';

interface FormComponentProps {
  id: string; // ID único para el formulario, útil para pruebas y referencias
  fields: FieldType[]; // Array de campos que el formulario debe renderizar, cada uno con su configuración
  onSubmit?: OnSubmitType; // Server action que se ejecuta al enviar el formulario
  className?: string; // Clase CSS opcional para estilizar el formulario
  children: (isLoading: boolean) => ReactNode; // Permite agregar contenido adicional (botones, loaders, etc.) que responden al estado de carga
}

// Export default en componentes
export default function FormComponent({
  fields = [],
  onSubmit = (_, __) => undefined,
  className = '',
  id,
  children,
}: FormComponentProps) {
  // useActionState gestiona el estado del formulario; result almacena la respuesta, dispatch envía los datos
  const [result, dispatch] = useActionState<ActionResponse | undefined, FormData>(
    onSubmit,
    undefined
  );
  // Estado de transición para indicar si una operación asíncrona está en progreso
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Si hay un resultado en la respuesta, inicia una transición (útil para indicar la carga)
    if (result) {
      startTransition(() => {}); // Reinicio el tansition
    }
  }, [result]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Recoge los datos del formulario
    startTransition(() => dispatch(formData)); // Inicia la transicion y ejecuta la server action
  };
  return (
    <form
      id={id}
      data-testid={id} // Asigna el ID también al atributo data-testid para pruebas
      onSubmit={handleSubmit} // Ejecuta el handleSubmit al enviar el formulario
      className={cn(className, 'relative flex w-full max-w-3xl flex-col gap-y-7')}>
      {/* Mapea los campos y renderiza cada uno usando el componente RenderFields */}
      {fields.map(field => (
        <RenderFields key={field.name} field={field} error={result?.errors?.[field.name] ?? ''} />
      ))}
      {children(isPending)}
      {/* Muestra un mensaje de error global si está presente en el resultado
           TODO: Asegurar que el estilo y el lugar donde aparezca el mensaje de error sean correctos
       */}
      {result?.errors && result.errors?.GLOBAL ? (
        <span className="left-30 absolute -bottom-6 text-sm text-red-400">
          {result.errors.GLOBAL}
        </span>
      ) : null}
    </form>
  );
}
