import Button from '@core/components/Button';

export function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Buscar cursos y lecciones"
        className="flex-1 rounded-lg border border-gray-700 bg-slate-200 px-4 py-2 text-sm text-zinc-500 focus:border-purple-600 focus:outline-none"
      />
      <Button className="py-3" variant="outline">
        Filtros
      </Button>

      <Button className="py-3" variant="outline">
        Ordenar por
      </Button>

      {/* <div className="mx-auto mt-3 w-full max-w-72">
        <Button variant="outline" size="full" className="py-6">
          {t('viewProjects')}
        </Button>
      </div> */}
    </div>
  );
}
