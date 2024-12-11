import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';

export default function FooterLinkList({
  title,
  links,
  disabled,
}: {
  title: string;
  links: { href: string; label: string }[];
  disabled?: boolean;
}) {
  return (
    <ul
      className={cn(
        'flex min-w-[160px] list-none flex-col gap-5 min-[790px]:min-w-[19.5%] min-[1340px]:min-w-[18%]',
        disabled && 'opacity-60'
      )}>
      <h3
        className={cn(
          'text-[17px] font-semibold text-white/60',
          disabled && 'select-none text-white/70'
        )}>
        {title}
      </h3>
      {links.map(link => (
        <li key={link.label}>
          <Link
            className={disabled ? 'pointer-events-none cursor-default select-none' : ''}
            href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
