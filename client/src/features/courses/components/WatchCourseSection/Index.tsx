import VideoLessons from '../VideoLessons/Index';
import VideoPlayer from '../VideoPlayer/Index';
import WatchVideoTabs from '../WatchVideoTabs/Index';

const WatchCourseSection = () => {
  return (
    <section className="mx-auto grid max-w-6xl rounded-lg bg-white/5 md:grid-cols-[1fr,320px]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4">
        <VideoPlayer src="https://storage.googleapis.com/klowhub-mediafiles/courses/processed/12345/2024-11-21T20%3A00%3A26.238Z-dandan/hls_stream0.m3u8?x-goog-signature=6ac970dfa17a81340b8d086159da30d2f653eace1c2360261c80bb79a68c4cecc2ec2365d12659433a8984cf50f3f6b4c214d3c2cfbb5f23e5e9ef15bcab8718f19520fa06cfb484d08552010dd42ae53271931cf1d99fc052d0c0bb33de1f886b78953000ebb4bb453a458c13faa7f6fa8f9fa9051b2b3ccc0dc8178705f1cadd15099626eb212d8ebe9ccbdd6eb2fa947b258909209a602761342b0ea0da1c103f2a0787a3ba86ff2c8500ecba4ae275b3cf03d68db5b4da643daf7f1644ee30b930dbbdcc16e7058a78624536877a1b1beacb035b88a858326ab082503b4bc4743a0e18bad3d9d7d6196c3cf04339025abb774b9033ee6bdfa0a70ebb9a29&x-goog-algorithm=GOOG4-RSA-SHA256&x-goog-credential=klouhub-service-be-media%40refreshing-site-441810-v7.iam.gserviceaccount.com%2F20241122%2Fsouthamerica-east1%2Fstorage%2Fgoog4_request&x-goog-date=20241122T131001Z&x-goog-expires=3600&x-goog-signedheaders=host" />
        <VideoLessons />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchVideoTabs />
      </div>
    </section>
  );
};

export default WatchCourseSection;
