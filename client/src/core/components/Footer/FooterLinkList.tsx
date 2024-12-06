import { Link } from '@core/lib/i18nRouting';

export default function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <ul className="flex min-w-[160px] list-none flex-col gap-5 min-[790px]:min-w-[19.5%] min-[1340px]:min-w-[18%]">
      <h3 className="text-[17px] font-semibold text-white/60">{title}</h3>
      {links.map(link => (
        <li key={link.label}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
