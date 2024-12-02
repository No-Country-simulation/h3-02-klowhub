type VideoMimeType =
  | 'video/mp4'
  | 'video/webm'
  | 'video/ogg'
  | 'video/x-msvideo'
  | 'video/quicktime'
  | 'video/x-matroska'
  | 'video/youtube'
  | 'application/vnd.apple.mpegurl'
  | 'application/dash+xml';

const extractExtension = (pathOrUrlString: string): string => {
  try {
    const processedString = pathOrUrlString.includes('://')
      ? decodeURIComponent(pathOrUrlString)
      : pathOrUrlString;

    // Eliminar cualquier parámetro de consulta si es una URL
    const pathPart = processedString?.split('?')?.[0] || '';

    // Manejar paths de sistemas de archivos (Windows y Unix)
    const pathParts = pathPart.replace(/\\/g, '/').split('/');
    const lastPart = pathParts[pathParts.length - 1] || '';

    const extensionMatch = lastPart.split('.').pop();
    return extensionMatch ? extensionMatch.toLowerCase() : '';
  } catch {
    return '';
  }
};

export const getVideoSourceType = (url: string): string => {
  const extensionMap: { [key: string]: VideoMimeType } = {
    m3u8: 'application/vnd.apple.mpegurl',
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
  };

  // Extraer extensión

  // Verificaciones adicionales para URLs complejas
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'video/youtube';
  }

  if (url.includes('.mpd')) {
    return 'application/dash+xml';
  }

  const extension = extractExtension(url);
  const media = extensionMap[extension as keyof typeof extensionMap];
  return media || 'video/mp4';
};
