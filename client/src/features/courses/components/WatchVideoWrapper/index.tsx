import type { Locale } from '@core/lib/i18nRouting';
import VideoPlayer from '../VideoPlayer';

interface WatchVideoWrapperProps {
  locale: Locale;
  lessonActiveId: string | number;
  videoUrl: string;
}

export default function WatchVideoWrapper({
  lessonActiveId,
  locale,
  videoUrl,
}: WatchVideoWrapperProps) {
  console.log(videoUrl, 'videoUrl');
  return <VideoPlayer activeLessonId={lessonActiveId} locale={locale} src={videoUrl || ''} />;
}
