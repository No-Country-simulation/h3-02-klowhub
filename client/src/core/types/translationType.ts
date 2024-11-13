import type { getTranslations } from 'next-intl/server';

export type TranslationType = Awaited<ReturnType<typeof getTranslations>>;
