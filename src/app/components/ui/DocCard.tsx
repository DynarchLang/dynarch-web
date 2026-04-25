import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface DocCardProps {
  children: ReactNode;
  delay?: number;
}

export function DocCard({ children, delay = 0 }: DocCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
}
