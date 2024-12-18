'use client';

import { cva } from 'class-variance-authority';
import { useEffect, useState } from 'react';
import css from './favbutton.module.css';
import { cn } from '../../lib/utils';

interface FavButtonProps {
  className?: string;
  color?: 'default' | 'white';
  variant?: 'default' | 'filled';
  isFavoriteStored?: boolean;
  saveToCart?: () => void;
}

const favButtonStyles = cva(css.favContainer, {
  variants: {
    color: {
      default: css.grayOutline,
      white: css.whiteOutline,
    },
    variant: {
      default: '',
      filled: css.favFilled,
    },
  },
  defaultVariants: {
    color: 'default',
    variant: 'default',
  },
});

const FavButton = ({
  className = '',
  color = 'default',
  variant = 'default',
  isFavoriteStored = false,
  saveToCart,
}: FavButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteStored);

  useEffect(() => {
    setIsFavorite(isFavoriteStored);
  }, [isFavoriteStored]);

  const handleFavorite = () => {
    setIsFavorite(_ => !isFavoriteStored);
    saveToCart?.();
  };
  return (
    <label
      htmlFor="favButton"
      className={cn(favButtonStyles({ color, variant }), className)}
      onClick={handleFavorite}>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={isFavorite}
        onChange={handleFavorite}
        id="favButton"
      />
      <div className={css.svgContainer}>
        <svg viewBox="0 0 24 24" className={css.svgOutline}>
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg viewBox="0 0 24 24" className={css.svgFilled}>
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg className={css.svgCelebrate} width={40} height={40}>
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </label>
  );
};

export default FavButton;
