import type { ReactNode } from 'react';
import Navbar from '@root/src/core/components/Navbar';

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start pt-28">
      <Navbar />
      {children}
    </div>
  );
}
