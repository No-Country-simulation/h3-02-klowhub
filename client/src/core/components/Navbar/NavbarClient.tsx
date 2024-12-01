'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Link } from '@core/lib/i18nRouting';
import { MenuItem } from './MenuItem';
import Button from '../Button';
import NavLink from '../NavLink';

const ANIMATION_HEADER_RANGE = [0, 100];
export const NavbarClient = ({
  children,
  navItems,
}: {
  children: ReactNode;
  navItems: { href: string; text: string }[];
}) => {
  const [supportBackdrop, setSupportBackdrop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);
  const ignoreRef = useRef<HTMLButtonElement>(null);
  const backgroundColor = useTransform(scrollY, ANIMATION_HEADER_RANGE, [
    'rgba(31, 41, 55, 0.4)',
    supportBackdrop ? 'rgba(31, 41, 55, 0.4)' : 'rgba(31, 41, 55, 1)',
  ]);
  const blurFilter = useTransform(scrollY, ANIMATION_HEADER_RANGE, ['blur(20px)', 'blur(40px)']);
  const top = useTransform(scrollY, ANIMATION_HEADER_RANGE, ['25px', '0px']);
  const topNegative = useTransform(scrollY, ANIMATION_HEADER_RANGE, ['-25px', '0px']);
  useEffect(() => {
    // Verifica si la API está disponible en el cliente
    if (typeof window !== 'undefined' && CSS.supports) {
      setSupportBackdrop(CSS.supports('backdrop-filter', 'blur(1px)'));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        ignoreRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !ignoreRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      style={{
        backgroundColor: backgroundColor,
        backdropFilter: blurFilter,
        top: top,
      }}
      className="absolute mx-auto size-full px-6 transition-all duration-300 ease-in-out">
      <div className="container mx-auto size-full w-full max-w-[1800px] px-6">
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
              ref={ignoreRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {!isMenuOpen ? (
                <Image src="/svg/menu.svg" alt="Menu" width={28} height={28} className="size-7" />
              ) : (
                <Image src="/svg/cross.svg" alt="Menu" width={28} height={28} className="size-7" />
              )}
            </Button>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ top: topNegative }}
                className="fixed right-0 z-10 min-h-screen w-full rounded-l-sm bg-neutral-100/80 backdrop-blur-2xl sm:max-w-[350px] min-[1400px]:hidden">
                <div className="flex h-full flex-col justify-between p-4">
                  <motion.nav
                    className="mt-16 flex flex-col space-y-4"
                    variants={{
                      open: {
                        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                      },
                      closed: {
                        transition: { staggerChildren: 0.05, staggerDirection: -1 },
                      },
                    }}>
                    {navItems.map(item => (
                      <MenuItem key={item.href}>
                        <NavLink href={item.href}>{item.text}</NavLink>
                      </MenuItem>
                    ))}
                  </motion.nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
