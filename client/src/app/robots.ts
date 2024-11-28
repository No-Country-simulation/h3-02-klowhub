import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@core/lib/utils';

// Función que genera las reglas de robots para el archivo robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
