import { useTranslations } from 'next-intl';
import { type Locale } from '@core/lib/i18nRouting';

import CartButton from './CartButton';
import { NavbarClient } from './NavbarClient';
import NavbarItems from './NavbarItems';
import UserModeToggle from './UserModeToggle';
import UserSubmenu from './UserSubMenu';
import LocaleSwitcherSelect from '../LocaleSwitcherSelect';

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
    <div className="header-bg-image fixed inset-x-0 top-0 z-50 mb-auto h-20 w-full max-w-[1940px] min-[1940px]:mx-auto min-[1940px]:rounded-b-2xl">
      <NavbarClient navItems={navItems} explorerText={t('explorer')} creatorText={t('creator')}>
        <NavbarItems navItems={navItems} />

        <div className="ml-auto hidden h-full items-center justify-center space-x-4 min-[1400px]:flex">
          <LocaleSwitcherSelect currentLocale={locale} />

          <CartButton altText={t('cartAlt')} labelText={t('cartLabel')} />
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
          <UserSubmenu
            profileAlt={t('mailAlt')}
            profileText={t('profile')}
            logoutText={t('logout')}
          />
        </div>
      </NavbarClient>
    </div>
  );
}
