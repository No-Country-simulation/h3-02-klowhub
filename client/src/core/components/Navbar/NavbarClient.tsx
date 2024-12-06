/* eslint-disable tailwindcss/no-unnecessary-arbitrary-value */
'use client';

import { Root as Portal } from '@radix-ui/react-portal';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import useClickOutside from '@core/hooks/useClickOutside';
import { Link } from '@core/lib/i18nRouting';
import { MenuItem } from './MenuItem';
import UserModeToggle from './UserModeToggle';
import Button from '../Button';
import NavLink from '../NavLink';

const ANIMATION_HEADER_RANGE = [0, 100];

export const NavbarClient = ({
  children,
  navItems,
  explorerText,
  creatorText,
}: {
  children: ReactNode;
  navItems: { href: string; text: string }[];
  explorerText: string;
  creatorText: string;
}) => {
  const [supportBackdrop, setSupportBackdrop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const menuRef = useRef<HTMLDivElement>(null);

  const backgroundColor = useTransform(scrollY, ANIMATION_HEADER_RANGE, [
    'rgba(31, 41, 55, 0.4)',
    supportBackdrop ? 'rgba(31, 41, 55, 0.4)' : 'rgba(31, 41, 55, 1)',
  ]);
  const blurFilter = useTransform(scrollY, ANIMATION_HEADER_RANGE, ['blur(20px)', 'blur(40px)']);
  const top = useTransform(scrollY, ANIMATION_HEADER_RANGE, ['25px', '0px']);
  useEffect(() => {
    // Verifica si la API está disponible en el cliente
    setSupportBackdrop(
      typeof window !== 'undefined' && CSS.supports
        ? CSS.supports('backdrop-filter', 'blur(1px)')
        : false
    );
  }, []);

  useClickOutside(menuRef, () => {
    setIsMenuOpen(false);
  });

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
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Image src="/svg/menu.svg" alt="Menu" width={28} height={28} className="size-7" />
            </Button>
          </div>
          <Portal>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuVariants}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed right-0 top-0 z-50 min-h-screen w-full rounded-l-sm bg-neutral-100/80 backdrop-blur-2xl sm:max-w-[350px] min-[1400px]:hidden">
                  <div className="relative h-[100dvh] w-full">
                    <Button
                      variant="ghost"
                      size="fit"
                      className="absolute right-6 top-5 animate-fade-in opacity-50 duration-300 animate-delay-300 hover:rotate-90 hover:opacity-100"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      <Image
                        src="/svg/cross.svg"
                        alt="Menu"
                        width={28}
                        height={28}
                        className="size-7"
                      />
                    </Button>
                    <div className="flex h-full flex-col justify-between py-4">
                      <motion.nav
                        className="mt-20 flex h-full flex-col space-y-4"
                        variants={{
                          open: {
                            transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                          },
                          closed: {
                            transition: { staggerChildren: 0.05, staggerDirection: -1 },
                          },
                        }}>
                        {navItems.map(item => (
                          <MenuItem
                            className="py-2 pe-4 ps-6 text-primary-B-100 transition-colors hover:cursor-pointer hover:bg-white/5 hover:!text-primary-A-200"
                            key={item.href}>
                            <NavLink className="text-inherit" href={item.href}>
                              {item.text}
                            </NavLink>
                          </MenuItem>
                        ))}
                      </motion.nav>
                      <UserModeToggle
                        className="absolute left-1 top-4 mt-0 h-fit scale-90 flex-row-reverse justify-end gap-x-3"
                        explorerText={explorerText}
                        creatorText={creatorText}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Portal>
        </div>
      </div>
    </motion.div>
  );
};
