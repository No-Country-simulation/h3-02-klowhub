'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Locale, routing, usePathname } from '@core/lib/i18nRouting';
import { localesLabel } from '@core/models/localeLabels';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../Dropdown/Index';

interface LocaleSwitcherSelectProps {
  currentLocale: Locale;
}

export default function LocaleSwitcherSelect({ currentLocale }: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    router.replace(`/${nextLocale}${pathname}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="no-outline">
        <Image
          src="/svg/world.svg"
          alt="World icon"
          width={24}
          height={24}
          className="size-7 object-center invert"
        />
      </DropdownMenuTrigger>
      <AnimatePresence>
        <DropdownMenuContent
          asChild
          sideOffset={12}
          className="bg-white/15 !p-0 font-medium text-white backdrop-blur-lg">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}>
            {routing.locales.map((locale, i) => (
              <DropdownMenuItem
                key={`${locale}-${i}`}
                className="w-full cursor-pointer px-2 transition-colors duration-300 ease-in-out hover:bg-white/5 hover:text-primary-A-200 active:bg-white/10 active:text-primary-A-100"
                onSelect={() => onSelectChange(locale)}>
                {
                  localesLabel[locale as keyof typeof localesLabel][
                    currentLocale as keyof typeof localesLabel
                  ]
                }
              </DropdownMenuItem>
            ))}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
