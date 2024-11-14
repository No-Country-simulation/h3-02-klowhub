'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type ReactNode, useState } from 'react';
import { Link } from '../../lib/i18nRouting';
import { cn } from '../../lib/utils';
import Button from '../Button';

const supportBackdrop = CSS.supports('backdrop-filter', 'blur(1px)');

export const NavbarClient = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(31, 41, 55, 0.4)', supportBackdrop ? 'rgba(31, 41, 55, 0.4)' : 'rgba(31, 41, 55, 1)']
  );
  const blurFilter = useTransform(scrollY, [0, 100], ['blur(20px)', 'blur(40px)']);
  const top = useTransform(scrollY, [0, 100], ['25px', '0px']);

  return (
    <motion.div
      style={{
        backgroundColor: backgroundColor,
        backdropFilter: blurFilter,
        top: top,
      }}
      className="container absolute mx-auto size-full max-w-[1850px] px-6 transition-all duration-300 ease-in-out">
      <div className="container mx-auto size-full max-w-[1850px] px-6">
        <div className="flex size-full items-center justify-between">
          <Link href="/platform" className="no-outline size-fit">
            <Image src="/images/logo.png" width={52} height={54} alt="Logo" />
          </Link>
          {children}
          <div className="z-20 flex min-[1400px]:hidden">
            <Button
              variant="ghost"
              size="fit"
              className="h-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? (
                <Image src="/svg/menu.svg" alt="Menu" width={28} height={28} className="size-7" />
              ) : (
                <Image src="/svg/cross.svg" alt="Menu" width={28} height={28} className="size-7" />
              )}
            </Button>
          </div>

          <div
            className={cn(
              'fixed right-0 top-[-25px] z-10 flex h-full min-h-screen rounded-bl-sm rounded-tl-sm bg-neutral-100 transition-all duration-300 ease-in-out min-[1400px]:hidden',
              isMenuOpen ? 'w-[40%]' : 'w-0'
            )}></div>
        </div>
      </div>
    </motion.div>
  );
};
