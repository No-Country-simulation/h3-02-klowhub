import { getLocale } from 'next-intl/server';
import { videoCourseSchema } from '../../schemas/video-schemas';
import { updateLessonViewStatus } from '../../service/searchLessonNotVied';
import VideoLessons from '../VideoLessons';
import WatchCourseNavigator from '../WatchCourseNavigator';
import WatchVideoWrapper from '../WatchVideoWrapper';

const ENV = process.env.NODE_ENV;

//https://klowhub-824410275969.southamerica-east1.run.app/
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
  const result = await fetch(
    `${ENV === 'production' ? 'https://klowhub-824410275969.southamerica-east1.run.app' : 'http://localhost:3000'}/json/course.json`
  );
  const dataUnknown = await result.json();
  const validData = videoCourseSchema.safeParse(dataUnknown);
  if (!validData.success) {
    return (
      <section className="mx-auto grid rounded-lg bg-white/5">
        <div className="flex h-[60dvh] w-full items-center justify-center rounded-lg border border-white/20 bg-white/10">
          <p className="text-center text-3xl font-bold text-red-600">Error inesperado</p>
        </div>
      </section>
    );
  }
  const updateLesson = updateLessonViewStatus(validData.data.modules, lessonActive);
  const lessonActiveId = updateLesson.updated ? lessonActive : validData.data.lastLessonId;
  const moduleActiveId = moduleActive || validData.data.lastModuleId;
  if (updateLesson.updated) {
    validData.data.modules = updateLesson.updatedModules;
  }

  return (
    <section className="mx-auto grid rounded-lg bg-white/5 md:grid-cols-[1fr,26%] min-[2000px]:grid-cols-[1fr,25%]">
      <div className="space-y-4 rounded-l-lg bg-white/10 p-4 contain-inline-size">
        <WatchVideoWrapper locale={locale} lessonActiveId={lessonActiveId} />
        <VideoLessons
          courseId={courseId}
          lessonActiveId={lessonActiveId}
          lessons={
            validData.data.modules.find(module => module.id === moduleActiveId)?.lessons || []
          }
        />
      </div>
      <div className="rounded-r-lg bg-white/10 p-4">
        <WatchCourseNavigator modules={validData.data.modules} />
      </div>
    </section>
  );
};

export default WatchCourseSection;
