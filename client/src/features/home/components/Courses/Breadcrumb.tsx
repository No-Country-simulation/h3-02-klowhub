export function Breadcrumb() {
  return (
    <nav className="mb-4 text-sm text-slate-200">
      <ol className="inline-flex list-none p-0">
        <li className="flex items-center">
          <a href="/es/platform" className="hover:text-white">
            Home
          </a>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <a href="/courses" className="hover:text-white">
            Cursos y lecciones
          </a>
          <span className="mx-2">/</span>
        </li>
      </ol>
    </nav>
  );
}
