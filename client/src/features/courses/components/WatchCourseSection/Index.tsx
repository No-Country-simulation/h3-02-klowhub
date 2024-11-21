import VideoLessons from '../VideoLessons/Index';
import VideoPlayer from '../VideoPlayer/Index';
import WatchVideoTabs from '../WatchVideoTabs/Index';

const WatchCourseSection = () => {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 bg-white/5 p-4 md:grid-cols-[1fr,320px]">
      <div className="space-y-4 bg-white/10">
        <VideoPlayer src="" />
        <VideoLessons />
      </div>
      <div className="rounded-lg bg-white/10">
        <WatchVideoTabs />
      </div>
    </section>
  );
};

export default WatchCourseSection;
