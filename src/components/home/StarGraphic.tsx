 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { Cpu, Database, Wifi, Code } from "lucide-react";

const departments = [
   { name: "Computer Science & AI", abbr: "CS-AI", icon: Cpu, path: "/departments/cs-ai" },
   { name: "Data Science", abbr: "DS", icon: Database, path: "/departments/data-science" },
   { name: "ICT", abbr: "ICT", icon: Wifi, path: "/departments/ict" },
   { name: "Software Engineering", abbr: "SEN", icon: Code, path: "/departments/software" },
];

const StarGraphic = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-primary-light/20 to-primary/20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Central circle */}
      <motion.div
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-sky shadow-glow flex items-center justify-center z-10"
        animate={{
          boxShadow: [
            "0 0 30px -5px hsl(199 89% 48% / 0.4)",
            "0 0 50px -5px hsl(199 89% 48% / 0.6)",
            "0 0 30px -5px hsl(199 89% 48% / 0.4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
         <div className="text-center text-white px-2">
           <p className="text-sm font-medium opacity-90">Faculty of</p>
           <p className="text-xl font-display font-bold tracking-wide">Computing</p>
        </div>
      </motion.div>

      {/* Department nodes in star pattern */}
      {departments.map((dept, index) => {
        const angle = (index * 90 - 45) * (Math.PI / 180);
        const radius = 42; // percentage from center
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        return (
          <motion.div
            key={dept.abbr}
            className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            {/* Connection line */}
           <svg
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 -z-10"
             style={{
               transform: `translate(-50%, -50%) rotate(${index * 90 + 45}deg)`,
             }}
           >
             <motion.line
               x1="80"
               y1="80"
               x2="40"
               y2="80"
               stroke="hsl(199 89% 48% / 0.3)"
               strokeWidth="2"
               strokeDasharray="4 4"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
             />
           </svg>

            {/* Node */}
           <Link to={dept.path}>
            <motion.div
               className="w-full h-full rounded-xl bg-card shadow-soft border border-border/50 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/50"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 30px -5px hsl(199 89% 48% / 0.4)",
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <dept.icon className="w-6 h-6 text-primary" />
              <span className="text-xs font-semibold text-foreground">{dept.abbr}</span>
            </motion.div>
           </Link>
          </motion.div>
        );
      })}

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default StarGraphic;
