import { Suspense } from 'react';
import type { Locale } from '@core/lib/i18nRouting';
import { videoFirmedSchema } from '../../schemas/video-schemas';
import VideoPlayer from '../VideoPlayer';

interface WatchVideoWrapperProps {
  locale: Locale;
  lessonActiveId: string | number;
}

const ENV = process.env.NODE_ENV;

export default async function WatchVideoWrapper({
  lessonActiveId,
  locale,
}: WatchVideoWrapperProps) {
  const video = await fetch(
    `${ENV === 'production' ? 'https://klowhub-824410275969.southamerica-east1.run.app' : 'http://localhost:3000'}/json/video-firmed.json`,
    { cache: 'no-store' }
  );
  const videoDataUnknown = await video.json();
  const validVideoData = videoFirmedSchema.safeParse(videoDataUnknown);

  return (
    <Suspense
      fallback={
        <div className="aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm"></div>
      }>
      <VideoPlayer
        activeLessonId={lessonActiveId}
        locale={locale}
        src={validVideoData.data?.src || ''}
      />
    </Suspense>
  );
}
