'use client';

import Image from 'next/image';
import { type PointerEvent, useCallback, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@core/components/Carrusel';
import { Link } from '@core/lib/i18nRouting';
import { cn } from '@core/lib/utils';
import css from './videolesson.module.css';
import type { VideoLessonsType } from '../../schemas/coursevideo.schemas';

interface VideoLessonsProps {
  lessons: VideoLessonsType[];
  courseId: string | number;
  lessonActiveId: string | number;
  moduleActiveId: string | number;
}

const VideoLessons = ({ moduleActiveId, lessons, courseId }: VideoLessonsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (target.closest('[data-carousel-item]')) {
      return;
    }

    setIsDragging(true);
  }, []);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <Carousel
      className={cn('container-lessons h-[110px] w-full overflow-auto', css.containerLessons)}>
      <CarouselContent
        onPointerDown={onPointerDown}
        onPointerCancel={onPointerUp}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="-ml-1 flex h-[110px] space-x-4">
        {lessons.map((lesson, index) => (
          <CarouselItem key={index} data-carousel-item="true" className="max-w-[190px] shrink-0">
            <Link
              href={{
                pathname: `${courseId}`,
                query: { lessonActive: `${moduleActiveId}-${lesson?.['_id']}` || lesson.id },
              }}
              scroll={false}
              className={cn(
                'group relative focus:outline-none',
                isDragging && 'pointer-events-none cursor-default select-none'
              )}>
              <Image
                src={'/images/mocks/course_mock1.png'}
                alt={lesson.name}
                width={180}
                height={108}
                className={
                  'aspect-video w-full select-none rounded-lg border object-cover transition-colors'
                }
              />
              <div
                className={cn(
                  'absolute inset-0 flex select-none items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100',
                  isDragging && 'pointer-events-none group-hover:opacity-0'
                )}>
                <span
                  className={cn(
                    'font-medium text-white',
                    isDragging && 'pointer-events-none select-none'
                  )}>
                  {lesson.name}
                </span>
              </div>
              <div className="absolute bottom-2 right-2 select-none rounded bg-black/80 px-1 text-xs text-white">
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
