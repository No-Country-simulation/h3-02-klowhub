'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import Button from '@core/components/Button';
import { cn } from '@core/lib/utils';

interface ShowMoreProps {
  children: ReactNode;
  maxHeight?: number;
  className?: string;
}

export default function ShowMore({ children, maxHeight = 300, className }: ShowMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > maxHeight);
    }
  }, [maxHeight]);

  return (
    <div className={cn('relative', className, isExpanded ? 'pb-6' : 'mb-6')}>
      <motion.div
        ref={contentRef}
        initial={false}
        animate={{ height: isExpanded ? 'auto' : maxHeight }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={cn('overflow-hidden')}>
        {children}
      </motion.div>
      <AnimatePresence>
        {!isExpanded && showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 rounded-b-lg backdrop-blur-sm"
            style={{
              boxShadow: 'inset 0 -80px 32px -32px rgb(0 0 0 / 35%)',
            }}
          />
        )}
      </AnimatePresence>

      {showButton && (
        <div className="relative z-40 mt-4 text-center">
          <div className={cn('absolute inset-x-0 bottom-7 w-full', isExpanded && '-bottom-12')}>
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/5 px-7 py-3 font-bold text-primary-A-200 transition-all duration-300 ease-in-out hover:bg-white/10 active:bg-white/15"
              size="fit"
              aria-expanded={isExpanded}
              aria-controls="expandable-content">
              <motion.span
                initial={false}
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="mr-2 inline-block">
                ▼
              </motion.span>
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
