import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = "" }: PageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered children animation container
export const StaggerContainer = ({ children, className = "", staggerDelay = 0.1 }: { children: ReactNode; className?: string; staggerDelay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual stagger item
export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in from direction
export const FadeIn = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  className = "",
  duration = 0.5 
}: { 
  children: ReactNode; 
  direction?: "up" | "down" | "left" | "right"; 
  delay?: number; 
  className?: string;
  duration?: number;
}) => {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale in animation
export const ScaleIn = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating animation for decorative elements
export const FloatingElement = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -15, 0],
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Subtle pulse glow
export const PulseGlow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    animate={{ 
      boxShadow: [
        "0 0 20px -5px hsl(42 92% 56% / 0.3)",
        "0 0 40px -5px hsl(42 92% 56% / 0.5)",
        "0 0 20px -5px hsl(42 92% 56% / 0.3)",
      ],
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Hover lift effect
export const HoverLift = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={className}
  >
    {children}
  </motion.div>
);

// Rotating element (for icons/decorations)
export const RotatingSlow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Counter animation for stats
export const AnimatedCounter = ({ value, suffix = "", className = "" }: { value: string; suffix?: string; className?: string }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 100, damping: 10 }}
    className={className}
  >
    {value}{suffix}
  </motion.span>
);
