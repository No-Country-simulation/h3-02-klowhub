import type { MetadataRoute } from 'next';

import { routing } from '@/core/lib/i18nRouting';
import { getBaseUrl } from '@/core/lib/utils';

// Función que genera un sitemap para la aplicación, cumpliendo con MetadataRoute.Sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`, // URL de la página principal de la aplicación
      alternates: {
        languages: Object.fromEntries(
          // Genera una lista de URLs alternativas para cada idioma habilitado
          routing.locales.map(locale => [locale, '/' + locale])
        ),
      },
      lastModified: new Date(), // Fecha de última modificación de la página, actualizada a la fecha actual
      changeFrequency: 'weekly',
      priority: 1, // Prioridad máxima de la página principal para los motores de búsqueda
    },
    // Add more URLs here
  ];
}
