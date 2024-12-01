import Image from 'next/image';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import FavButton from '@core/components/FavButton/FavButton';
import styles from './card.module.css';

interface CardProps {
  title: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  tags: string[];
  imageSrc: string;
  imageAlt?: string;
  textButton: string;
  emoji: string;
  categoria: 'Curso' | 'Lección' | string;
}

const categoryStyles: Record<string, string> = {
  Curso: 'bg-purple-200 text-purple-800',
  Lección: 'bg-green-200 text-green-800',
  default: 'bg-gray-200 text-gray-800',
};

const Card = ({
  title,
  description,
  price,
  rating,
  reviews,
  tags,
  imageSrc,
  textButton,
  emoji,
  imageAlt = 'Imagen del curso', // Valor predeterminado para `alt`
  categoria,
}: CardProps) => {
  const styleClass = categoryStyles[categoria] || categoryStyles.default;
  return (
    <div
      className={`${styles.card} max-w-sm rounded-lg border-2 border-[#21262f] bg-[#222934] p-4 shadow-md`}>
      <div className="relative">
        <div className="bg-white/8 !absolute right-3 top-2 size-[24px] rounded-[12px]">
          <FavButton className="block first-letter:drop-shadow-[drop-shadow(6px_4px_14px_black)]" />
        </div>

        <Image
          src={imageSrc} // Imagen reutilizable
          alt={imageAlt} // Texto alternativo para accesibilidad
          width={500} // Ancho recomendado (puedes ajustar según tus necesidades)
          height={400} // Altura recomendada
          className="h-48 w-full rounded-t-lg object-cover"
        />
        <span className={`absolute left-2 top-2 rounded px-2 py-1 text-sm font-bold ${styleClass}`}>
          {categoria}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-200">{title}</h3>
        <p className="mt-1 text-sm text-slate-200">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="neutral" className="rounded-lg" size="default">
            <Image
              src={emoji}
              //src="/images/appsheet_logo.png"
              alt="Carrito"
              width="20"
              height="20"
              className="mr-2"
            />
            {textButton}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2"></div>
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
      <div className="mt-4 flex justify-between">
        <Button
          className="rounded bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
          variant="default">
          <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
          Añadir al carrito
        </Button>
        <Button className="text-sm font-bold text-purple-600 hover:underline" variant="ghost">
          Ver detalles
        </Button>
      </div>
    </div>
  );
};

export default Card;
