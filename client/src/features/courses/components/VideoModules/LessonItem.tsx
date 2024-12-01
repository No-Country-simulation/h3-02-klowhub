'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo } from 'react';
import Button from '@core/components/Button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@core/components/HoverCard';
import CheckCircle from '@core/components/Icon/CheckCircle';
import { useRouterQueryState } from '@core/hooks/useRouterQueryState';
import { cn } from '@core/lib/utils';
import type { VideoLessonsType } from '../../schemas/video-schemas';

interface LessonItemProps {
  lesson: VideoLessonsType;
  moduleId: string | number;
}

export default function LessonItem({ lesson, moduleId }: LessonItemProps) {
  const [lessonActive, setActiveLesson] = useRouterQueryState('lessonActive', '');
  const [_, setModuleActive] = useRouterQueryState('moduleActive', '');
  const activeLesson = useMemo(
    () => ({
      id: lessonActive,
    }),
    [lessonActive]
  );
  const changeLesson = useCallback(
    (newLesson: string | number) => {
      setActiveLesson(String(newLesson));
      setModuleActive(String(moduleId));
    },
    [activeLesson.id, moduleId]
  );
  const isActive = activeLesson.id === lesson.id;
  const isViewdAndNotActive = lesson.isViewd && !isActive;
  const color = isViewdAndNotActive ? '#4de853' : isActive ? '#B95ED4' : '#fff';

  return (
    <motion.div
      initial={false}
      animate={{
        color,
      }}
      transition={{ duration: 0.3 }}>
      <Button
        onClick={() => changeLesson(lesson.id)}
        variant="ghost"
        className={cn(
          'w-full justify-start py-5 pe-4 ps-2 font-medium text-inherit',
          activeLesson.id === lesson.id
            ? 'bg-white hover:bg-white'
            : 'bg-transparent hover:bg-white/10'
        )}>
        <HoverCard openDelay={950}>
          <HoverCardTrigger className="flex w-full items-center gap-2">
            <span className="truncate">{lesson.name}</span>
            <AnimatePresence>
              {isViewdAndNotActive && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto">
                  <div className="size-4 text-success-200">
                    <CheckCircle />
                  </div>
                </motion.div>
              )}
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
