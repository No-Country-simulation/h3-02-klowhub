'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo } from 'react';
import Button from '@core/components/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@core/components/HoverCard';
import { useRouterQueryState } from '@core/hooks/useRouterQueryState';
import { cn } from '@core/lib/utils';
import type { VideoLessonsType } from '../../schemas/coursevideo.schemas';

interface LessonItemProps {
  lesson: VideoLessonsType;
  moduleId: string | number;
}

export default function LessonItem({ lesson, moduleId }: LessonItemProps) {
  const lessonId = lesson?.['_id'] || lesson.id;
  const [lessonActive, setActiveLesson] = useRouterQueryState('lessonActive', '');
  const activeLesson = useMemo(
    () => ({
      id: lessonActive,
    }),
    [lessonActive]
  );
  const changeLesson = useCallback(
    (newLesson: string | number) => {
      setActiveLesson(`${String(moduleId)}-${String(newLesson)}`);
    },
    [activeLesson.id, moduleId]
  );
  const isActive = activeLesson.id === lessonId;
  const isViewedAndNotActive = lesson.isViewd && !isActive;
  const color = isViewedAndNotActive ? '#fff' : isActive ? '#B95ED4' : '#fff';

  return (
    <motion.div
      initial={false}
      animate={{
        color,
      }}
      transition={{ duration: 0.3 }}>
      <Button
        onClick={() => changeLesson(lessonId)}
        variant="ghost"
        className={cn(
          'w-full justify-start py-5 pe-4 ps-2 font-medium text-inherit',
          activeLesson.id === lessonId
            ? 'bg-white hover:bg-white'
            : 'bg-transparent hover:bg-white/10'
        )}>
        <HoverCard openDelay={950}>
          <HoverCardTrigger className="flex w-full items-center gap-2">
            <span className="truncate">{lesson.name}</span>
            <AnimatePresence>
              {/*
              isViewedAndNotActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto">
                  <div className="text-success-200 size-4">
                    <CheckCircle />
                  </div>
                </motion.div>
              )*/}
            </AnimatePresence>
          </HoverCardTrigger>
          <HoverCardContent
            sideOffset={15}
            align="start"
            className="w-auto min-w-fit max-w-[var(--radix-hover-card-content-available-width)] px-8 py-3 font-medium">
            {lesson.name}
          </HoverCardContent>
        </HoverCard>
      </Button>
    </motion.div>
  );
}
