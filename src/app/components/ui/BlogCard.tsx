import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BlogCardProps {
  children: ReactNode;
  delay?: number;
  inView: boolean;
}

export function BlogCard({ children, delay = 0, inView }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.9 }}
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
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
        rotateX: -5,
        transition: { duration: 0.3 },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
