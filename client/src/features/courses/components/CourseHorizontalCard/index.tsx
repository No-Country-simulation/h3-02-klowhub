'use client';

import Image from 'next/image';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import FavButton from '@core/components/FavButton/FavButton';

interface CourseHorizontalCardProps {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  textButton: string;
  emoji: string;
  categoria: string;
  viewDetails: string;
}

const categoryStyles: Record<string, string> = {
  Curso: 'bg-purple-200 text-purple-800',
  Lección: 'bg-green-200 text-green-800',
  default: 'bg-gray-200 text-gray-800',
};

const CourseHorizontalCard = ({
  imageUrl,
  title,
  description,
  rating,
  reviews,
  textButton,
  emoji,
  tags,
  categoria,
  viewDetails,
}: CourseHorizontalCardProps) => {
  /*const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);*/
  const styleClass = categoryStyles[categoria] || categoryStyles.default;

  return (
    <div className="mt-6 flex h-auto w-full flex-col items-center overflow-hidden rounded-lg bg-[#222934] shadow-lg md:h-[315px] md:flex-row md:items-stretch">
      {/* Imagen */}
      <div className="relative h-[200px] w-full flex-none md:h-auto md:w-1/3">
        <Image
          src={imageUrl}
          width={500}
          height={300}
          alt="Product"
          className="size-full object-cover object-center"
        />
        <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
          {categoria}
        </span>
        <div className="bg-white/8 !absolute right-3 top-2 size-[24px] rounded-[12px]">
          <FavButton
            color="white"
            variant="filled"
            className="block drop-shadow-[6px_4px_14px_black]"
          />
        </div>
      </div>

      {/* Contenedor de detalles y menú de 3 puntos */}
      <div className="relative flex flex-1 flex-col p-4">
        {/* Detalles */}
        <div className="relative mb-2">
          <h1 className="mb-2 text-lg font-bold text-slate-200 md:text-xl">{title}</h1>
          <p className="mb-4 text-sm text-slate-200 md:text-base">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2 pb-2">
            <Button variant="neutral" className="rounded-lg" size="default">
              <Image src={emoji} alt="Carrito" width="20" height="20" className="mr-2" />
              {textButton}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 pb-4">
            {tags.map((tag, index) => (
              <Badge key={index} text={tag}></Badge>
            ))}
          </div>
          <div className="flex items-center">
            <p className="mr-2 text-base font-medium text-slate-200">{rating}</p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={index < Math.floor(rating) ? '#FFD700' : '#E5E5E5'}
                  viewBox="0 0 24 24"
                  className="size-5">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm text-slate-200">{`(${reviews} reviews)`}</p>
          </div>
        </div>

        {/* Menú de tres puntos */}
        {/*
        <div className="top-2 right-4 absolute mt-2">
          <button
            onClick={handleMenuToggle}
            className="text-slate-200 hover:text-slate-300 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6">
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
                    onClick={() => alert('Editar')}
                    className="block hover:bg-[#4A5568] px-4 py-2 w-full text-left text-slate-200 text-sm">
                    Editar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('Eliminar')}
                    className="block hover:bg-[#4A5568] px-4 py-2 w-full text-left text-slate-200 text-sm">
                    Eliminar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      */}

        <div className="mt-auto flex items-center">
          <Button className="rounded-lg text-sm text-white" variant="default">
            {viewDetails}
          </Button>
          {/*
          <Button
            className="ml-4 font-bold text-sm hover:underline"
            style={{
              color: 'var(--color-primary-B-200)',
            }}
            variant="ghost">
            Ver detalles
          </Button>
         */}
        </div>
      </div>
    </div>
  );
};

export default CourseHorizontalCard;
