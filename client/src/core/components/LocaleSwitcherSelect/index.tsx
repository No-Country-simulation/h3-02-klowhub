'use client';

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
          className="object-center invert"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white/15 font-medium text-white backdrop-blur-lg">
        {routing.locales.map((locale, i) => (
          <DropdownMenuItem
            key={`${locale}-${i}`}
            className="w-full"
            onSelect={() => onSelectChange(locale)}>
            {
              localesLabel[locale as keyof typeof localesLabel][
                currentLocale as keyof typeof localesLabel
              ]
            }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
