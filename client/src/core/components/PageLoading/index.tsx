import { AnimatePresence, motion } from 'framer-motion';

export default function PageLoading() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex size-full items-center justify-center bg-gradient-bg-1">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
          className="text-center">
          <motion.h1
            className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
            animate={{
              backgroundPosition: ['0%', '100%'],
              transition: {
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}>
            KlowHub
          </motion.h1>
          <div className="mt-6 space-y-2">
            <motion.div
              className="mx-auto h-1 w-16 rounded-full bg-purple-600"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
            <motion.div
              className="mx-auto h-1 w-12 rounded-full bg-blue-500"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 0.2,
              }}
            />
            <motion.div
              className="mx-auto h-1 w-8 rounded-full bg-indigo-500"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: 0.4,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
