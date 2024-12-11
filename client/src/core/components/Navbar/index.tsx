import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, type Locale } from '@core/lib/i18nRouting';

import { NavbarClient } from './NavbarClient';
import UserModeToggle from './UserModeToggle';
import LocaleSwitcherSelect from '../LocaleSwitcherSelect';
import NavLink from '../NavLink';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('Navbar');
  const navItems = [
    { href: '/platform', text: t('dashboardLink') },
    { href: '/courses', text: t('coursesLink') },
    { href: '/appstore', text: t('appstoreLink') },
    { href: '/projects', text: t('projectsLink') },
    { href: '/consultancies', text: t('consultanciesLink') },
    { href: '/about-appsheet', text: t('aboutappsheetLink') },
  ];
  return (
    <div className="header-bg-image fixed inset-x-0 top-0 z-50 mb-auto h-20 w-full">
      <NavbarClient navItems={navItems} explorerText={t('explorer')} creatorText={t('creator')}>
        <nav className="hidden grow items-center justify-center space-x-10 min-[1400px]:flex">
          {/* <PlatformToggle homeText={t('homeText')} platformText={t('platformText')} /> */}
          <div className="flex items-center justify-center gap-4">
            {navItems.map(item => (
              <NavLink key={item.href} href={item.href}>
                {item.text}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="ml-auto hidden h-full items-center justify-center space-x-4 min-[1400px]:flex">
          <LocaleSwitcherSelect currentLocale={locale} />
          {/* <Button aria-label={t('cartLabel')} size="fit" variant="ghost">
            <Image
              src="/svg/cart.svg"
              alt={t('cartAlt')}
              width={24}
              height={24}
              className="size-6"
            />
          </Button>
          <Button aria-label={t('bellLabel')} size="fit" variant="ghost">
            <Image
              src="/svg/bell.svg"
              alt={t('bellAlt')}
              width={24}
              height={24}
              className="size-6"
            />
          </Button>
          <Button aria-label={t('mailLabel')} size="fit" variant="ghost">
            <Image
              src="/svg/mail.svg"
              alt={t('mailAlt')}
              width={24}
              height={24}
              className="size-6"
            />
          </Button>  */}
          <UserModeToggle explorerText={t('explorer')} creatorText={t('creator')} />
          <Link href="/profile" className="flex size-12 items-center justify-center rounded-full">
            <Image
              src="/images/mocks/seba.png"
              alt={t('mailAlt')}
              width={60}
              height={60}
              className="size-full rounded-full object-cover"
            />
          </Link>
        </div>
      </NavbarClient>
    </div>
  );
}
