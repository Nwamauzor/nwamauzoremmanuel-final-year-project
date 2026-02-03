import { motion } from "framer-motion";

// Floating orbs for hero sections
export const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gold orb */}
    <motion.div
      className="absolute w-64 h-64 rounded-full opacity-20"
      style={{
        background: "radial-gradient(circle, hsl(42 92% 56% / 0.6) 0%, transparent 70%)",
        top: "10%",
        right: "10%",
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Blue orb */}
    <motion.div
      className="absolute w-48 h-48 rounded-full opacity-15"
      style={{
        background: "radial-gradient(circle, hsl(224 60% 45% / 0.8) 0%, transparent 70%)",
        bottom: "20%",
        left: "5%",
      }}
      animate={{
        y: [0, 20, 0],
        x: [0, -10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
    
    {/* Small accent orb */}
    <motion.div
      className="absolute w-32 h-32 rounded-full opacity-25"
      style={{
        background: "radial-gradient(circle, hsl(42 92% 56% / 0.5) 0%, transparent 70%)",
        top: "50%",
        left: "15%",
      }}
      animate={{
        y: [0, -20, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />
  </div>
);

// Animated grid lines
export const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(42 92% 56% / 0.3) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(42 92% 56% / 0.3) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
      animate={{
        backgroundPosition: ["0px 0px", "60px 60px"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

// Decorative corner accent
export const CornerAccent = ({ position = "top-right" }: { position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" }) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0 rotate-90",
    "bottom-right": "bottom-0 right-0 -rotate-90",
    "bottom-left": "bottom-0 left-0 rotate-180",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-32 h-32 pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M 100 0 L 100 30 Q 100 50 80 50 L 50 50 Q 30 50 30 70 L 30 100"
          fill="none"
          stroke="hsl(42 92% 56% / 0.3)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};

// Animated line separator
export const AnimatedSeparator = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`h-px bg-gradient-to-r from-transparent via-accent to-transparent ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  />
);

// Sparkle effect
export const Sparkle = ({ className = "", delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute w-2 h-2 ${className}`}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    <svg viewBox="0 0 24 24" className="w-full h-full fill-accent-gold">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  </motion.div>
);

// Animated card wrapper with hover effects
export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ 
      y: -5, 
      boxShadow: "0 20px 40px -15px hsl(42 92% 56% / 0.2)",
      transition: { duration: 0.2 }
    }}
    className={className}
  >
    {children}
  </motion.div>
);
