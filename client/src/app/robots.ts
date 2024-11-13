import type { MetadataRoute } from 'next';

import { getBaseUrl } from '@/core/lib/utils';

// Función que genera las reglas de robots para el archivo robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Indica que las reglas aplican a todos los rastreadores (user agents)
      allow: '*', // Permite el acceso a todas las rutas de la aplicación
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`, // Ruta al sitemap, basado en la URL base de la aplicación
  };
}
