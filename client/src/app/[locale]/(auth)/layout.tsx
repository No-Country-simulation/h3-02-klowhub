import type { ReactNode } from 'react';
import Navbar from '@root/src/core/components/Navbar';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Navbar />
      {children}
    </div>
  );
}
