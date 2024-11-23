import VideoLessons from '../VideoLessons/Index';
import VideoPlayer from '../VideoPlayer/Index';
import WatchVideoTabs from '../WatchVideoTabs/Index';

const WatchCourseSection = () => {
  return (
    <section className="mx-auto grid max-w-6xl rounded-lg bg-white/5 md:grid-cols-[1fr,320px]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4">
        <VideoPlayer src="https://storage.googleapis.com/klowhub-mediafiles/courses/processed/12345/2024-11-21T16%3A48%3A08.435Z-dandan/hls_stream0.m3u8?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=klouhub-service-be-media%40refreshing-site-441810-v7.iam.gserviceaccount.com%2F20241122%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241122T174541Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=64a3b20a930ce2e5ac4cab8dcd23edf45758522d482e957b1c6be3ba1823bb3408239bc8ade79b9a40f3698932a544bd818394df4de882084294c7bbb978801a817e0428313d312444269ba96e04e7a2adb0432f0b6dcd9b2cae8acfdf8e0c44f0a289453474c8e910432b91f851cc01a1da2ca6aea06a949c6386ed69c2275cb004b11dbb446942fc0ba552038a87aae819491daf0521a39ba0aeec7406a8a5b54e7b9ccebcffa42eadcf5aeb2b6661894be4629ba89261991ded918372376c5c3a75644e3b17f7901b7fce8084b378ca9fa808f2d8ef6db3b6d8e1e956d63828698b073297e1fca3e00b33c74242c7d148a79bda9570dd4bed6744fca4538f" />
        <VideoLessons />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchVideoTabs />
      </div>
    </section>
  );
};

export default WatchCourseSection;
