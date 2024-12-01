'use client';
import { motion } from 'framer-motion';
import ChevronDownIcon from '../Icon/ChevronDownIcon';

interface AnimatedChevronProps {
  isOpen: boolean;
}

const AnimatedChevron = ({ isOpen }: AnimatedChevronProps) => {
  return (
    <motion.div
      className="size-5"
      animate={{ rotate: isOpen ? 180 : 0, translateX: isOpen ? 5 : 0, color: isOpen ? '' : '' }}
      transition={{ duration: 0.3 }}>
      <ChevronDownIcon />
    </motion.div>
  );
};

export default AnimatedChevron;
