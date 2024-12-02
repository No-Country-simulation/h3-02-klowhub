import { getLocale } from 'next-intl/server';
import { getContent } from '@core/services/getContent';
import { type VideoCourseType } from '../../schemas/video-schemas';
import VideoLessons from '../VideoLessons';
import WatchCourseNavigator from '../WatchCourseNavigator';
import WatchVideoWrapper from '../WatchVideoWrapper';

const WatchCourseSection = async ({
  lessonActive,
  courseId,
  moduleActive,
}: {
  lessonActive: string;
  moduleActive: string;
  courseId: string | number;
}) => {
  const locale = await getLocale();
  const course = await getContent<VideoCourseType>('/json/course.json');

  if (!course) {
    return (
      <section className="mx-auto grid rounded-lg bg-white/5">
        <div className="flex h-[60dvh] w-full items-center justify-center rounded-lg border border-white/20 bg-white/10">
          <p className="text-center text-3xl font-bold text-red-600">Error inesperado</p>
        </div>
      </section>
    );
  }

  const lessonActiveId = lessonActive || course.lastLessonId;
  const moduleActiveId = moduleActive || course.lastModuleId;

  return (
    <section className="mx-auto grid rounded-lg bg-white/5 md:grid-cols-[1fr,26%] min-[2000px]:grid-cols-[1fr,25%]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4 contain-inline-size">
        <WatchVideoWrapper locale={locale} lessonActiveId={lessonActiveId} />
        <VideoLessons
          courseId={courseId}
          lessonActiveId={lessonActiveId}
          lessons={course.modules.find(module => module.id === moduleActiveId)?.lessons || []}
        />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchCourseNavigator modules={course.modules} />
      </div>
    </section>
  );
};

export default WatchCourseSection;
