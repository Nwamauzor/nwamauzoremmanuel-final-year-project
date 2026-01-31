import { motion } from "framer-motion";
import StarGraphic from "./StarGraphic";
const HeroSection = () => {
  return <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden circuit-bg">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orb */}
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-light/10 blur-3xl" animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Star Graphic */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="order-1 lg:order-1">
            <StarGraphic />
          </motion.div>

          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="order-2 lg:order-2 text-center lg:text-left">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                University of Ibadan
              </span>
            </motion.div>

            <motion.h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }}>
              Faculty of{" "}
              
            </motion.h1>

            <motion.p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }}>
              Pioneering excellence in computing education, research, and innovation. 
              Shaping the future of technology in Nigeria and beyond.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 justify-center lg:justify-start" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
              <a href="/departments" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-primary-dark transition-all">
                Explore Departments
              </a>
              <a href="/students/admission" className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground font-semibold rounded-xl border border-border shadow-sm hover:border-primary hover:text-primary transition-all">
                Apply Now
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7
          }}>
              {[{
              value: "4",
              label: "Departments"
            }, {
              value: "50+",
              label: "Faculty"
            }, {
              value: "2000+",
              label: "Students"
            }].map(stat => <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-display text-3xl lg:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;