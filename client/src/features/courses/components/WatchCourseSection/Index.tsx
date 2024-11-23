import { getLocale } from 'next-intl/server';
import VideoLessons from '../VideoLessons/Index';
import VideoPlayer from '../VideoPlayer/Index';
import WatchVideoTabs from '../WatchVideoTabs/Index';

const WatchCourseSection = async () => {
  const locale = await getLocale();
  return (
    <section className="mx-auto grid rounded-lg bg-white/5 md:grid-cols-[1fr,320px]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4">
        <VideoPlayer
          locale={locale}
          src="https://storage.googleapis.com/klowhub-mediafiles/courses/processed/12345/2024-11-21T20%3A00%3A26.238Z-dandan/hls_stream0.m3u8?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=klouhub-service-be-media%40refreshing-site-441810-v7.iam.gserviceaccount.com%2F20241123%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241123T035335Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=12fcfd65086f98a0c17414e22fa32ef427fdda0465ac91e4bc09d9bc0ec15181172315a88e9afbbcab79ee5be4daee9a5aaae028e864931ddbf79f8644eac9ce3df0cc8a4b924521c2005afbd2e8d4300d7c0bc21248d3de7db35cb7c02cf3f4319e299c53fcda304f7989a218346b6dd98afa13521c591aa5aba2e19065d286fb51a815bdf4a804e3d21a8f52042f8bced4a584b7216b4c0579ccb4779d4695bd391ac4a2032345da9c8b6fc9ce5f4f430e1463c32bfc43df58968c15484501487c12bf978585683b3d61a3fdfd4d5a350efecaa0f228898705c4d59687a7776c49b5d3def76472db24c94b703405f890b0adcb4f53771252010a775a45066b"
        />
        <VideoLessons />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchVideoTabs />
      </div>
    </section>
  );
};

export default WatchCourseSection;
