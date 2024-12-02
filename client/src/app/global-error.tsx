'use client';

export default function GlobalError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        {/* Pagina de errores global. Modificar estilo o eliminar si es necesario*/}
        <h2>Something went wrong!</h2>
        <button onClick={() => props.reset()}>Try again</button>
      </body>
    </html>
  );
}
