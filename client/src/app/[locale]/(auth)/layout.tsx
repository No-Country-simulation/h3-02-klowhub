import { type ReactNode, Suspense } from 'react';
import Footer from '@core/components/Footer/index';
import Navbar from '@core/components/Navbar';
import Loading from '../loading';

export default function CourseLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      {children}
      <Footer></Footer>
    </Suspense>
  );
}
