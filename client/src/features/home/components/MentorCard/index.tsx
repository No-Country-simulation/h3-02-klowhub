'use client';
import Image from 'next/image'; // Importa el componente Image de Next.js
import React, { useEffect, useRef, useState } from 'react';
import Button from '@root/src/core/components/Button';
import styles from './MentorCard.module.css';

interface CardProps {
  title: string;
  price: string;
  reviews: number;
  imageSrc: string; // Nueva propiedad para reutilización
  imageAlt?: string; // Texto alternativo opcional
  textButton: string;
  emoji: string;
  sessions: string;
  idioma: string;
  urlPais: string;
}

const CardTeacher: React.FC<CardProps> = ({
  title,
  price,
  reviews,
  imageSrc,
  textButton,
  emoji,
  imageAlt = 'Imagen del curso',
  sessions,
  idioma,
  urlPais,
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

  return (
    <div className={`${styles.card} rounded-lg border-2 border-[#21262f] bg-[#222934] shadow-md`}>
      <div className="relative">
        <Button className="top absolute right-2 border-none bg-transparent p-0 text-2xl focus:outline-none">
          🤍
        </Button>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={400}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      </div>

      <div className="grow p-4">
        {/* <h3 className="text-lg font-bold text-slate-200">{title}</h3> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-200">{title}</h3>
          <Image width={30} alt="s" src={urlPais} height={20}></Image>
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

        <div className="mt-3 flex flex-wrap gap-2 pb-2">
          <Button variant="neutral" className="rounded-lg" size="default">
            <Image src={emoji} alt="Carrito" width="20" height="20" className="mr-2" />
            {textButton}
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-slate-300">
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M8 21h8"></path>
            <path d="M12 17v4"></path>
            <polygon points="10 9 15 12 10 15 10 9"></polygon>
          </svg>
          <p className="text-sm text-slate-200"> {sessions} Sesiones </p>
          <p className="ml-2 text-sm text-slate-200">({reviews} Reseñas)</p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm text-slate-200"> {idioma} </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-lg font-bold text-slate-200">${price} USD / Hora</div>
        </div>
      </div>
    </div>
  );
};

export default CardTeacher;
