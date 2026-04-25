import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ForumCardProps {
  children: ReactNode;
  delay?: number;
  inView: boolean;
}

export function ForumCard({ children, delay = 0, inView }: ForumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8, scale: 0.95 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}
