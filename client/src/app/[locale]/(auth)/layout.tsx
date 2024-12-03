import type { ReactNode } from 'react';
import Footer from '@core/components/Footer/index';
import Navbar from '@core/components/Navbar';

export default function CourseLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer></Footer>
    </>
  );
}
