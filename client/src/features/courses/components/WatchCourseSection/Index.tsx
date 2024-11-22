import VideoLessons from '../VideoLessons/Index';
import VideoPlayer from '../VideoPlayer/Index';
import WatchVideoTabs from '../WatchVideoTabs/Index';

const WatchCourseSection = () => {
  return (
    <section className="mx-auto grid max-w-6xl rounded-lg bg-white/5 md:grid-cols-[1fr,320px]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4">
        <VideoPlayer src="https://storage.cloud.google.com/klowhub-mediafiles/courses/processed/12345/2024-11-21T20%3A00%3A26.238Z-dandan/hls_stream0.m3u8" />
        <VideoLessons />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchVideoTabs />
      </div>
    </section>
  );
};

export default WatchCourseSection;
