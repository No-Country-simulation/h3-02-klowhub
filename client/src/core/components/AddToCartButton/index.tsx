import Image from 'next/image';
import Button from '../Button';

interface AddToCartButtonProps {
  addToCart: string;
  customSaveToCart: () => void;
}

export default function AddToCartButton({ addToCart, customSaveToCart }: AddToCartButtonProps) {
  return (
    <Button
      className="relative z-10 rounded-lg px-4 py-2 text-sm text-white"
      onClick={customSaveToCart}>
      <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
      {addToCart}
    </Button>
  );
}
