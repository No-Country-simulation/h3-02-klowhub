'use client';

import { Provider } from 'jotai';
import type { ReactNode } from 'react';

export default function ProviderSupport({ children }: Readonly<{ children: ReactNode }>) {
  return <Provider>{children}</Provider>;
}
