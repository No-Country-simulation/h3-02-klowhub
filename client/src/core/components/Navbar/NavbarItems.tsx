import NavLink from '../NavLink';

interface NavbarItemsProps {
  navItems: {
    href: string;
    text: string;
  }[];
}

export default function NavbarItems({ navItems }: NavbarItemsProps) {
  return (
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
  );
}
