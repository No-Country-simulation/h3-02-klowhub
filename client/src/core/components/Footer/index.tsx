import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@core/lib/i18nRouting';
import { about, categories, socialLinks, support } from '@core/models/footerLinks.model';
import FooterLinkList from './FooterLinkList';

export default function Footer() {
  const t = useTranslations('Footer');
  const categoriesLinks = categories(t);
  const aboutLinks = about(t);
  const supportLinks = support(t);
  return (
    <div className="mt-auto flex w-full flex-col justify-center gap-6 bg-gradient-bg-2 pb-4 pt-14 text-sm font-normal text-white">
      <div className="flex flex-col items-center justify-center gap-8 min-[1025px]:items-start min-[1025px]:justify-start">
        <div className="mx-auto flex w-full max-w-[1998px] flex-col items-center justify-center gap-x-[5%] gap-y-16 px-[3.5%] min-[790px]:flex-row min-[790px]:items-start min-[1340px]:px-[6.5%]">
          <FooterLinkList links={categoriesLinks} title={t('categoryTitle')} />
          <FooterLinkList links={aboutLinks} title={t('aboutTitle')} />
          <FooterLinkList links={supportLinks} title={t('supportTitle')} />
          <div className="me-4 flex min-w-[19.5%] flex-col self-center justify-self-end min-[790px]:ms-auto min-[1025px]:me-16 min-[1340px]:min-w-[18%]">
            <h3 className="text-center">{t('followTitle')}</h3>
            <ul className="my-6 flex list-none flex-row items-center justify-center gap-6">
              {socialLinks.map(({ href, src, alt, size }) => (
                <li key={alt} className="min-h-7 min-w-7">
                  <Link href={href}>
                    <Image
                      src={src}
                      width={size}
                      height={size}
                      alt={alt}
                      className="object-cover object-center"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="w-full max-w-[90%] border-t-2 border-white/20 min-[790px]:max-w-none" />
        <div className="col flex w-full items-center justify-center">
          <small className="w-full text-center text-sm">{t('footerCopyRight')}</small>
        </div>
      </div>
    </div>
  );
}
