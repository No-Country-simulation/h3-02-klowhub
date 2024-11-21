import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
export default function Footera() {
  const t = useTranslations('Footer');
  return (
    <div className="flex flex-col justify-center gap-6 px-[10.5rem] py-10 text-sm font-normal text-white">
      <div className="flex flex-col items-center justify-center gap-12 min-[1025px]:items-start min-[1025px]:justify-start">
        <div className="flex flex-col gap-6 min-[790px]:flex-row min-[1025px]:gap-[4.5rem]">
          <ul className="flex flex-col gap-6">
            <h3>Categoria</h3>
            <li>
              <a href="#">{t('categoryCourses')}</a>
            </li>
            <li>
              <a href="#">{t('categoryApps')}</a>
            </li>
            <li>
              <a href="#">{t('categorySellCourse')}</a>
            </li>
            <li>
              <a href="#"> {t('categorySellApp')}</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-6">
            <h3>{t('aboutTitle')}</h3>
            <li>
              <a href="#">{t('aboutInstructors')}</a>
            </li>
            <li>
              <a href="#">{t('aboutTermsOfService')}</a>
            </li>
            <li>
              <a href="#">{t('aboutPrivacyPolicy')}</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-6">
            <h3> {t('supportTitle')}</h3>
            <li>
              <a href="#">{t('supportFAQ')}</a>
            </li>
            <li>
              <a href="#">{t('supportContact')}</a>
            </li>
            <li>
              <a href="#">{t('supportForum')}</a>
            </li>
          </ul>
          <div className="mt-6 flex flex-col">
            <h3>{t('followTitle')}</h3>
            <ul className="my-6 flex flex-row gap-6">
              <li>
                <a href="#">
                  <Image src="/svg/facebookIn.svg" width={13} height={13} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image src="/svg/twitter.svg" width={25} height={25} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image src="/svg/linkedin.svg" width={23} height={23} alt="facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="w-full border-t-2 border-white/20" />
        <div className="col">
          <p>&copy; {t('footerCopyRight')}</p>
        </div>
      </div>
    </div>
  );
}
