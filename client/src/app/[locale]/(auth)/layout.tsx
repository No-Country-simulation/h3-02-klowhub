import { getLocale } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';
import Footer from '@core/components/Footer/index';
import Navbar from '@core/components/Navbar';
import { getProfile } from '@core/services/services.getProfile';
import ProviderSupport from './provider';
import Loading from '../loading';

export default async function CourseLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  const creator = await getProfile();
  return (
    <Suspense fallback={<Loading />}>
      <ProviderSupport>
        <Navbar locale={locale} creator={creator}></Navbar>
        {children}
        <Footer></Footer>
      </ProviderSupport>
    </Suspense>
  );
}
