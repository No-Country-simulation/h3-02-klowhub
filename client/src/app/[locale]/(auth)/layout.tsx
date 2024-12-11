import { type ReactNode, Suspense } from 'react';
import Footer from '@core/components/Footer/index';
import Navbar from '@core/components/Navbar';
import Loading from '../loading';

export default async function CourseLayout({
  children,
  params,
}: Readonly<{ params: Promise<{ locale: string }>; children: ReactNode }>) {
  const { locale } = await params;
  return (
    <Suspense fallback={<Loading />}>
      <Navbar locale={locale} />
      {children}
      <Footer></Footer>
    </Suspense>
  );
}
