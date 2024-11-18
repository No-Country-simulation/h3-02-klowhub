import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { NavbarClient } from './NavbarClient';
import UserModeToggle from './UserModeToggle';
import { Link } from '../../lib/i18nRouting';
import Button from '../Button';
import NavLink from '../NavLink';

export default function Navbar() {
  const t = useTranslations('Navbar');
  return (
    <div className="header-bg-image fixed inset-x-0 top-0 z-50 mb-auto h-20 w-full">
      <NavbarClient>
        <nav className="hidden grow items-center justify-center space-x-10 min-[1400px]:flex">
          {/* <PlatformToggle homeText={t('homeText')} platformText={t('platformText')} /> */}
          <div className="flex items-center justify-center gap-4">
            <NavLink href="/platform">{t('dashboardLink')}</NavLink>
            <NavLink href="/courses">{t('coursesLink')}</NavLink>
            <NavLink href="/appstore">{t('appstoreLink')}</NavLink>
            <NavLink href="/projects">{t('projectsLink')}</NavLink>
            <NavLink href="/consultancies">{t('consultanciesLink')}</NavLink>
            <NavLink href="/about-appsheet">{t('aboutappsheetLink')}</NavLink>
          </div>
        </nav>
        <div className="ml-auto hidden h-full items-center justify-center space-x-4 min-[1400px]:flex">
          <Button aria-label={t('cartLabel')} size="fit" variant="ghost">
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
          </Button>
          <UserModeToggle explorerText={t('explorer')} creatorText={t('creator')} />
          <Link
            href="/profile"
            className="flex size-12 items-center justify-center rounded-full bg-white p-2"></Link>
        </div>
      </NavbarClient>
    </div>
  );
}
