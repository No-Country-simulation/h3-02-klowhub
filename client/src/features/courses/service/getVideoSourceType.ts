export const getVideoSourceType = (url: string): string => {
  const extensionMap = {
    m3u8: 'application/vnd.apple.mpegurl',
    mp4: 'video/mp4',
    webm: 'video/webm',
    ogg: 'video/ogg',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
  };

  // Extraer extensión
  const extension = url.split('.').pop()?.toLowerCase() || '';

  // Verificaciones adicionales para URLs complejas
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'video/youtube';
  }

  if (url.endsWith('.mpd')) {
    return 'application/dash+xml';
  }

  return extensionMap[extension as keyof typeof extensionMap] || 'video/mp4';
};
