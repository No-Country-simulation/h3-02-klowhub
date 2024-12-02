import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@core/components/Carrusel';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import css from './videolesson.module.css';
import type { VideoLessonsType } from '../../schemas/video-schemas';

interface VideoLessonsProps {
  lessons: VideoLessonsType[];
  courseId: string | number;
  lessonActiveId: string | number;
}

const VideoLessons = ({ lessons, courseId }: VideoLessonsProps) => {
  return (
    <Carousel
      className={cn('h-[110px] w-full overflow-auto', css.containerLessons)}
      opts={{
        direction: 'ltr',
      }}>
      <CarouselContent className="-ml-1 flex h-[110px] space-x-4">
        {lessons.map((lesson, index) => (
          <CarouselItem key={index} className="max-w-[190px] shrink-0">
            <Link
              href={{
                pathname: `${courseId}`,
                query: { lessonActive: lesson.id },
              }}
              scroll={false}
              className="group relative focus:outline-none">
              <Image
                src={lesson.thumbnail}
                alt={lesson.name}
                width={180}
                height={108}
                className="group-hover:border-primary aspect-video w-full rounded-lg border object-cover transition-colors"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-medium text-white">{lesson.name}</span>
              </div>
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 text-xs text-white">
                {lesson.duration}
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default VideoLessons;
