import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const MenuItem = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};
