import type { MetadataRoute } from 'next';

import { routing } from '@core/lib/i18nRouting';
import { getBaseUrl } from '@core/lib/utils';

// Función que genera un sitemap para la aplicación, cumpliendo con MetadataRoute.Sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      alternates: {
        languages: Object.fromEntries(routing.locales.map(locale => [locale, '/' + locale])),
      },
      lastModified: new Date(), // Fecha de última modificación de la página, actualizada a la fecha actual
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
