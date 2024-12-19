'use client';

import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartStoreAtom } from '@features/cart/store/cart.store';
import CartCounter from './CartCounter';

interface CartButtonProps {
  altText: string;
  labelText: string;
}

export default function CartButton({ altText, labelText }: CartButtonProps) {
  const course = useAtomValue(cartStoreAtom);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter(course.length);
  }, [course.length]);
  return (
    <Link aria-label={labelText} href="/cart" className="relative">
      <CartCounter counter={counter} />

      <Image src="/svg/cart.svg" alt={altText} width={24} height={24} className="size-7" />
    </Link>
  );
}
