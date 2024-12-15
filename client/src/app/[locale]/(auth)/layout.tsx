import { getLocale } from 'next-intl/server';
import { type ReactNode, Suspense } from 'react';
import Footer from '@core/components/Footer/index';
import Navbar from '@core/components/Navbar';
import Loading from '../loading';

export default async function CourseLayout({ children }: Readonly<{ children: ReactNode }>) {
  const locale = await getLocale();
  return (
    <Suspense fallback={<Loading />}>
      <Navbar locale={locale} />
      {children}
      <Footer></Footer>
    </Suspense>
  );
}
