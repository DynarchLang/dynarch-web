import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  inView: boolean;
}

export function FloatingCard({ children, delay = 0, inView }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15, z: -100 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              z: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -15,
        rotateX: -10,
        rotateY: 5,
        z: 80,
        scale: 1.03,
        transition: { duration: 0.4, type: 'spring', stiffness: 300 },
      }}
      className="perspective-1000"
    >
      {children}
    </motion.div>
  );
}
