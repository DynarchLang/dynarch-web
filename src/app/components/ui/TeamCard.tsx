import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface TeamCardProps {
  children: ReactNode;
  delay?: number;
  inView: boolean;
}

export function TeamCard({ children, delay = 0, inView }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -15, scale: 0.85 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateY: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -12,
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.4 },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
