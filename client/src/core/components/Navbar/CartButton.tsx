'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { cartStoreAtom } from '@features/cart/store/cart.store';

interface CartButtonProps {
  altText: string;
  labelText: string;
}

export default function CartButton({ altText, labelText }: CartButtonProps) {
  const course = useAtomValue(cartStoreAtom);
  return (
    <Link aria-label={labelText} href="/cart" className="relative">
      <AnimatePresence>
        {course.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -right-3 -top-3 rounded-full bg-white px-2 text-xs text-black">
            {course.length}
          </motion.div>
        )}
      </AnimatePresence>

      <Image src="/svg/cart.svg" alt={altText} width={24} height={24} className="size-7" />
    </Link>
  );
}
