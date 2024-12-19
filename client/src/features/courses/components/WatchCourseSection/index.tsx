import type { Locale } from '@core/lib/i18nRouting';
import { getContent } from '@core/services/getContent';
import { type VideoCourseType } from '../../schemas/coursevideo.schemas';
import VideoLessons from '../VideoLessons';
import WatchCourseNavigator from '../WatchCourseNavigator';
import WatchVideoWrapper from '../WatchVideoWrapper';

const WatchCourseSection = async ({
  lessonActive,
  courseId,
  moduleActive,
  locale,
}: {
  lessonActive: string;
  moduleActive: string;
  courseId: string | number;
  locale: Locale;
}) => {
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
    <section className="mx-auto flex flex-col gap-y-8 rounded-lg min-[1280px]:grid min-[1280px]:grid-cols-[1fr,26%] min-[1280px]:gap-y-0 min-[1280px]:bg-white/5 min-[2000px]:grid-cols-[1fr,25%]">
      <div className="video-container-name space-y-4 rounded-lg bg-white/15 min-[780px]:p-4 min-[1280px]:rounded-r-none min-[1280px]:bg-white/10">
        <WatchVideoWrapper locale={locale} lessonActiveId={lessonActiveId} />
        <div className="px-4 pb-4 min-[780px]:px-0">
          <h3 className="mb-3 ps-4 font-normal text-white">Vista previa</h3>
          <VideoLessons
            courseId={courseId}
            lessonActiveId={lessonActiveId}
            lessons={course.modules.find(module => module.id === moduleActiveId)?.lessons || []}
          />
        </div>
      </div>
      <div className="mx-[3%] rounded-lg bg-neutral-100 p-4 min-[780px]:mx-0 min-[1280px]:rounded-l-none min-[1280px]:bg-white/10">
        <WatchCourseNavigator locale={locale} modules={course.modules} />
      </div>
    </section>
  );
};

export default WatchCourseSection;
