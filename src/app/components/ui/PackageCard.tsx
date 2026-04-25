import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PackageCardProps {
  children: ReactNode;
  delay?: number;
  inView: boolean;
}

export function PackageCard({ children, delay = 0, inView }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -10, scale: 0.9 }}
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
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
