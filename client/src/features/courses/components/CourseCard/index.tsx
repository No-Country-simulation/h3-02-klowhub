'use client';
import Image from 'next/image';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import FavButton from '@core/components/FavButton/FavButton';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import styles from './CourseCard.module.css';

interface CardProps {
  courseId?: string | number;
  title: string;
  description?: string;
  price?: string;
  rating: number;
  reviews?: number;
  tags: string[];
  imageSrc: string;
  imageAlt?: string;
  platform: string;
  viewDetails: string;
  addToCart: string;
  categoria: 'Curso' | 'Lección' | string;
  className?: string;
}

const categoryStyles: Record<string, string> = {
  Curso: 'bg-purple-200 text-purple-800',
  Lección: 'bg-green-200 text-green-800',
  default: 'bg-gray-200 text-gray-800',
};

const CourseCard = ({
  title,
  description,
  price,
  rating,
  reviews,
  tags,
  imageSrc = '/aa',
  platform,
  viewDetails,
  addToCart,
  imageAlt = 'Imagen del curso',
  courseId = '',
  categoria,
  className = '',
}: CardProps) => {
  //const [isMenuOpen, setMenuOpen] = useState(false);
  //const menuRef = useRef<HTMLDivElement>(null);

  // Manejar la apertura/cierre del menú
  /*const handleMenuToggle = () => {
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

  const styleClass = categoryStyles[categoria] || categoryStyles.default;

  return (
    <div
      className={cn(
        className,
        'relative flex flex-col rounded-lg border-2 border-[#21262f] bg-[#222934] shadow-app-1',
        styles.card
      )}>
      {/* Este link en absolute es el que navega hacia el detalle*/}
      <Link
        href={`/courses/${courseId}`}
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
        alt={imageAlt}
        width={500}
        height={400}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
        {categoria}
      </span>

      <div className="grow p-4">
        {/* <h3 className="font-bold text-lg text-slate-200">{title}</h3> */}
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-2 max-h-14 min-h-14 text-ellipsis text-lg font-bold text-slate-200">
            {title}
          </h3>
          {/* Menú de tres puntos */}
          {/* <div className="relative" ref={menuRef}>
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
              <div className="right-0 absolute bg-[#2D3748] shadow-lg mt-2 rounded-lg w-32">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleEdit}
                      className="block hover:bg-[#4A5568] px-4 py-2 w-full text-left text-slate-200 text-sm">
                      Editar
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDelete}
                      className="block hover:bg-[#4A5568] px-4 py-2 w-full text-left text-slate-200 text-sm">
                      Eliminar
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>*/}
        </div>

        {description ? (
          <p className="mt-1 line-clamp-2 max-h-10 text-ellipsis pb-2 text-sm text-slate-200">
            {description}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap gap-2 pb-2">
          <Button
            variant="neutral"
            asChild
            className="pointer-events-none cursor-default select-none rounded-lg"
            size="default">
            <div>
              <Image
                src={getPlatformLogo(platform)}
                alt={platform}
                width="20"
                height="20"
                className="mr-2"
              />
              {platform}
            </div>
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {tags?.map((tag, index) => <Badge key={index} text={tag}></Badge>)}
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
          {reviews && reviews !== 0 ? (
            <p className="ml-2 text-sm text-slate-200">({reviews})</p>
          ) : null}
        </div>
        {price ? (
          <div className="mt-4 flex items-center gap-2">
            <strong className="text-lg font-bold text-slate-200">${price}</strong>
          </div>
        ) : null}
      </div>
      {/*
      <div className="mt-auto flex items-center p-4">
        <Button className="rounded-lg px-4 py-2 text-sm text-white">
          <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
          {addToCart}
        </Button>
        <Button className="ms-auto text-sm font-bold hover:underline" variant="ghost">
          {viewDetails}
        </Button>
      </div>
      */}
    </div>
  );
};

export default CourseCard;
