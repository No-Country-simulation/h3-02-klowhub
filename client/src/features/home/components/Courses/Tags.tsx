import Button from '@root/src/core/components/Button';

export function Categories() {
  const categories = [
    'UX-UI',
    'Base de datos',
    'Expresiones y fórmulas',
    'Automatización',
    'Flujo de trabajo',
    'Acciones-Behavior',
    'Seguridad y Accesibilidad',
    'General',
  ];

  return (
    <div className="bg mt-4 flex flex-wrap gap-2 py-2">
      {categories.map((category, index) => (
        <Button key={index} variant="outline">
          {category}
        </Button>
      ))}
    </div>
  );
}
