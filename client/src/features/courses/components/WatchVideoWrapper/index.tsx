import { Suspense } from 'react';
import type { Locale } from '@core/lib/i18nRouting';
import { getContent } from '@core/services/getContent';
import { type VideoFirmedType } from '../../schemas/coursevideo.schemas';
import VideoPlayer from '../VideoPlayer';

interface WatchVideoWrapperProps {
  locale: Locale;
  lessonActiveId: string | number;
}

export default async function WatchVideoWrapper({
  lessonActiveId,
  locale,
}: WatchVideoWrapperProps) {
  const validVideoData = await getContent<VideoFirmedType>(`/json/video-firmed.json`, {
    next: {
      revalidate: 3600,
      tags: ['video-firmed'],
    },
  });

  return (
    <Suspense
      fallback={
        <div className="aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"></div>
      }>
      <VideoPlayer
        activeLessonId={lessonActiveId}
        locale={locale}
        src={validVideoData?.src || ''}
      />
    </Suspense>
  );
}
