import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@core/lib/i18nRouting';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <div className="mt-auto flex w-full flex-col justify-center gap-6 bg-gradient-bg-2 pb-4 pt-14 text-sm font-normal text-white">
      <div className="flex flex-col items-center justify-center gap-8 min-[1025px]:items-start min-[1025px]:justify-start">
        <div className="mx-auto flex w-full max-w-[1998px] flex-col items-center justify-center gap-x-[6.5rem] gap-y-16 px-9 min-[790px]:flex-row min-[1025px]:gap-x-[8.5rem] min-[1025px]:px-[10.5rem]">
          <ul className="flex min-w-[145px] flex-col gap-5">
            <h3 className="text-[17px] font-semibold text-white/60">Categoria</h3>
            <li>
              <Link href="#">{t('categoryCourses')}</Link>
            </li>
            <li>
              <Link href="#">{t('categoryApps')}</Link>
            </li>
            <li>
              <Link href="#">{t('categorySellCourse')}</Link>
            </li>
            <li>
              <Link href="#"> {t('categorySellApp')}</Link>
            </li>
          </ul>
          <ul className="flex min-w-[145px] flex-col gap-5">
            <h3 className="text-[17px] font-semibold text-white/60">{t('aboutTitle')}</h3>
            <li>
              <Link href="#">{t('aboutInstructors')}</Link>
            </li>
            <li>
              <Link href="#">{t('aboutTermsOfService')}</Link>
            </li>
            <li>
              <Link href="#">{t('aboutPrivacyPolicy')}</Link>
            </li>
          </ul>
          <ul className="flex min-w-[145px] flex-col gap-5">
            <h3 className="text-[17px] font-semibold text-white/60"> {t('supportTitle')}</h3>
            <li>
              <Link href="#">{t('supportFAQ')}</Link>
            </li>
            <li>
              <Link href="#">{t('supportContact')}</Link>
            </li>
            <li>
              <Link href="#">{t('supportForum')}</Link>
            </li>
          </ul>
          <div className="me-4 flex min-w-[145px] flex-col self-center justify-self-end min-[790px]:ms-auto min-[1025px]:me-16">
            <h3 className="text-center">{t('followTitle')}</h3>
            <ul className="my-6 flex flex-row items-center justify-center gap-6">
              <li className="min-h-7 min-w-4">
                <Link href="#" className="min-h-7 min-w-4">
                  <Image
                    src="/svg/facebookIn.svg"
                    width={16}
                    height={16}
                    className="object-cover object-center"
                    alt="facebook"
                  />
                </Link>
              </li>
              <li className="min-h-7 min-w-7">
                <Link href="#" className="min-h-7 min-w-7">
                  <Image
                    src="/svg/twitter.svg"
                    width={30}
                    height={30}
                    className="object-cover object-center"
                    alt="twitter/X"
                  />
                </Link>
              </li>
              <li className="min-h-7 min-w-7">
                <Link href="#" className="min-h-7 min-w-7">
                  <Image
                    src="/svg/linkedin.svg"
                    width={30}
                    height={30}
                    className="object-cover object-center"
                    alt="LinkedIn"
                  />
                </Link>
              </li>
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
