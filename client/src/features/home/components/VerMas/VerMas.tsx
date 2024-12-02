import Button from '@core/components/Button';

export const VerMas = () => {
  return (
    <div className="mt-3 flex items-center justify-center p-6">
      <Button
        className="rounded-lg border px-10 py-2 text-sm font-bold transition-all duration-300 hover:border-gray-400 hover:text-white"
        style={{
          color: 'var(--color-primary-B-200)',
        }}
        variant="outline">
        Ver más
      </Button>
    </div>
  );
};
