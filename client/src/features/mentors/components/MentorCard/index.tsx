'use client';
import Image from 'next/image';
import Button from '@core/components/Button';
import FavButton from '@core/components/FavButton/FavButton';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import styles from './MentorCard.module.css';

interface CardProps {
  name: string;
  price: string;
  reviews: number;
  imageSrc: string;
  platform: string;
  sessions: string | number;
  idioma: string;
  countryCode: string;
  hourText: string;
  reviewText: string;
  sessionText: string;
}

const CardTeacher = ({
  name,
  price,
  reviews,
  imageSrc,
  platform,
  sessions,
  idioma,
  countryCode,
  hourText,
  reviewText,
  sessionText,
}: CardProps) => {
  /* const [isMenuOpen, setMenuOpen] = useState(false);
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
  }, []);*/

  return (
    <div
      className={cn(
        'relative rounded-lg border-2 border-[#21262f] bg-[#222934] shadow-md',
        styles.card
      )}>
      {/* Este link en absolute es el que navega hacia el detalle*/}
      <Link
        href={`/mentors`}
        className="transparent absolute left-0 top-0 size-full text-[0px] text-transparent text-opacity-0">
        .
      </Link>
      <div className="bg-white/8 !absolute right-3 top-2 size-[24px] rounded-[12px]">
        <FavButton
          color="white"
          variant="filled"
          className="block drop-shadow-[6px_4px_14px_black]"
        />
      </div>
      <Image
        src={imageSrc}
        alt={name}
        width={500}
        height={400}
        className="h-48 w-full rounded-t-lg object-cover"
      />

      <div className="grow p-4">
        {/* <h3 className="text-lg font-bold text-slate-200">{title}</h3> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-200">{name}</h3>
          <Image
            alt="Country Flag"
            src={`https://kapowaz.github.io/square-flags/flags/${countryCode}.svg`}
            className="rounded-full object-center"
            width={30}
            height={20}
          />
          {/*
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
          */}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 pb-2">
          <Button asChild variant="neutral" size="default">
            <div>
              <Image
                src={getPlatformLogo(platform)}
                alt="Carrito"
                width="20"
                height="20"
                className="mr-2"
              />
              {platform}
            </div>
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
          <p className="text-sm text-slate-200">
            {sessions} {sessionText}
          </p>
          <p className="ml-2 text-sm text-slate-200">
            ({reviews} {reviewText})
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm text-slate-200"> {idioma} </p>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="text-lg font-bold text-slate-200">
            ${price} USD / {hourText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTeacher;
