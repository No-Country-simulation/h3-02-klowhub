'use client';
import Image from 'next/image'; // Importa el componente Image de Next.js
import React, { useEffect, useRef, useState } from 'react';
import Badge from '@root/src/core/components/Badge/Index';
import Button from '@root/src/core/components/Button';
import styles from './CourseCard.module.css';

interface CardProps {
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  tags: string[];
  imageSrc: string; // Nueva propiedad para reutilización
  imageAlt?: string; // Texto alternativo opcional
  textButton: string;
  emoji: string;
  categoria: 'Curso' | 'Lección' | string;
}

const categoryStyles: Record<string, string> = {
  Curso: 'bg-purple-200 text-purple-800',
  Lección: 'bg-green-200 text-green-800',
  default: 'bg-gray-200 text-gray-800',
};

const CourseCard: React.FC<CardProps> = ({
  title,
  description,
  price,
  rating,
  reviews,
  tags,
  imageSrc,
  textButton,
  emoji,
  imageAlt = 'Imagen del curso',
  categoria,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Manejar la apertura/cierre del menú
  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleEdit = () => {
    alert('Editar opción seleccionada.');
  };

  const handleDelete = () => {
    alert('Eliminar opción seleccionada.');
  };

  // Detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false); // Cerrar el menú
      }
    };

    // Agregar el evento al documento
    document.addEventListener('mousedown', handleClickOutside);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const styleClass = categoryStyles[categoria] || categoryStyles.default;

  return (
    <div
      className={`${styles.card} flex flex-col rounded-lg border-2 border-[#21262f] bg-[#222934] shadow-md`}>
      <div className="relative">
        <Button className="absolute right-2 top-2 border-none bg-transparent p-0 text-2xl focus:outline-none">
          🤍
        </Button>

        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={400}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
          {categoria}
        </span>
      </div>

      <div className="grow p-4">
        {/* <h3 className="text-lg font-bold text-slate-200">{title}</h3> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-200">{title}</h3>
          {/* Menú de tres puntos */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMenuToggle}
              className="text-slate-200 hover:text-slate-200 focus:outline-none"
              aria-label="Opciones del menú">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v.01M12 12v.01M12 18v.01"
                />
              </svg>
            </button>
            {/* Contenido del menú */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-[#2D3748] shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleEdit}
                      className="block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-[#4A5568]">
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDelete}
                      className="block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-[#4A5568]">
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <p className="mt-1 pb-2 text-sm text-slate-200">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2 pb-2">
          <Button variant="neutral" className="rounded-lg" size="default">
            <Image src={emoji} alt="Carrito" width="20" height="20" className="mr-2" />
            {textButton}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} text={tag}></Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            <p className="mr-2 text-slate-200">{rating}</p>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`${
                  i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'
                } text-lg`}>
                ★
              </span>
            ))}
          </div>
          <p className="ml-2 text-sm text-slate-200">({reviews})</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-lg font-bold text-slate-200">${price}</div>
        </div>
      </div>
      <div className="mt-auto flex items-center p-4">
        <Button
          className="rounded-lg px-4 py-2 text-sm text-white hover:bg-purple-700"
          style={{
            backgroundColor: 'var(--color-primary-B-500)',
            borderColor: 'var(--color-primary-A-500)',
          }}
          variant="default">
          <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
          Añadir al carrito
        </Button>
        <Button
          className="ml-4 text-sm font-bold hover:underline"
          style={{
            color: 'var(--color-primary-B-200)',
          }}
          variant="ghost">
          Ver detalles
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
