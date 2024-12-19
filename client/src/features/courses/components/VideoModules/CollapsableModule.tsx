import { AnimatePresence, motion } from 'framer-motion';
import type { z } from 'zod';
import AnimatedChevron from '@core/components/AnimatedChevron';
import Button from '@core/components/Button';
import ModuleIcon from '@core/components/Icon/ModuleIcon';
import { cn } from '@core/lib/utils';
import LessonItem from './LessonItem';
import { videoModuleSchema } from '../../schemas/coursevideo.schemas';

interface CollapsableModuleProps {
  module: z.infer<typeof videoModuleSchema>;
  isOpen: boolean;
  onToggle: () => void;
}

const CollapsableModule = ({ module, isOpen, onToggle }: CollapsableModuleProps) => {
  return (
    <>
      <Button
        variant="ghost"
        onClick={onToggle}
        className={cn(
          'w-full items-center justify-between py-6 pe-4 ps-3 text-[15px] font-normal text-white transition-colors duration-200 hover:bg-white/5',
          isOpen && 'text-primary-B-300'
        )}>
        <span className="flex items-center gap-2">
          <div className="size-7">
            <ModuleIcon />
          </div>
          <span className="line-clamp-1 max-h-6 text-ellipsis text-[18px] leading-6">
            {module.title}
          </span>
        </span>
        <AnimatedChevron isOpen={isOpen} />
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative overflow-hidden">
            <div className="ms-9 space-y-1 rounded-lg bg-white/10 before:absolute before:left-[20px] before:top-0 before:h-full before:w-[2px] before:bg-white before:content-['']">
              {module.lessons.map(lesson => (
                <LessonItem
                  key={lesson?.['_id'] || lesson.id}
                  lesson={lesson}
                  moduleId={module?.['_id'] || module.id}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CollapsableModule;
