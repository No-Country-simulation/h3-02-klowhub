import type { ReactNode } from 'react';
import Footer from '@core/components/Footer';

export default function WatchCourseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
