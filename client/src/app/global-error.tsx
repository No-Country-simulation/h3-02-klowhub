'use client';

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
  params: { locale: string };
}) {
  return (
    <html lang={props.params.locale}>
      <body>
        {/* Pagina de errores global. Modificar estilo o eliminar si es necesario*/}
        <h2>Something went wrong!</h2>
        <button onClick={() => props.reset()}>Try again</button>
      </body>
    </html>
  );
}
