import React from 'react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[]; // Lista de elementos del breadcrumb
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="mb-4 text-sm text-slate-200">
      <ol className="inline-flex list-none p-0">
        {items.map((item, index) => (
          <li className="flex items-center" key={index}>
            <a href={item.href} className="hover:text-white">
              {item.label}
            </a>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};
