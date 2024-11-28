import type { ReactNode } from 'react';
import Footer from '@core/components/Footer';

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
