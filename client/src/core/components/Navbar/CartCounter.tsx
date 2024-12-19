import { AnimatePresence, motion } from 'framer-motion';

interface CartCounterProps {
  counter: number;
}

export default function CartCounter({ counter }: CartCounterProps) {
  return (
    <AnimatePresence>
      {counter > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -right-3 -top-3 rounded-full bg-white px-2 text-xs text-black">
          {counter}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
