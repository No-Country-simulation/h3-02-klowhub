import type { getTranslations } from 'next-intl/server';

export type TranslationType<T> = Awaited<ReturnType<typeof getTranslations<T>>>;
