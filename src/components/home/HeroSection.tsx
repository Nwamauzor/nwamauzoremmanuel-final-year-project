import { motion } from "framer-motion";
import StarGraphic from "./StarGraphic";

const HeroSection = () => {
  return <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden circuit-bg">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-primary/10 blur-3xl" animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        <motion.div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-primary-light/10 blur-3xl" animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        
        {/* Mobile blue accent strip at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-sky sm:hidden" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-4 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Star Graphic - visible on all screens */}
          <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="order-2 lg:order-1 flex justify-center max-w-xs sm:max-w-md mx-auto lg:max-w-lg">
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
          }} className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="inline-block">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mr-2 animate-pulse" />
                University of Ibadan
              </span>
            </motion.div>

            <motion.h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }}>
              Faculty of
              <br />
              <span className="text-primary">Computing</span>
            </motion.h1>

            <motion.p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed" initial={{
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

            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }}>
              <a href="/departments" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-primary-dark transition-all text-sm sm:text-base">
                Explore Departments
              </a>
              <a href="/students/admission" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-card text-foreground font-semibold rounded-xl border border-border shadow-sm hover:border-primary hover:text-primary transition-all text-sm sm:text-base">
                Apply Now
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border" initial={{
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
                value: "5",
                label: "Programmes"
              }, {
                value: "2000+",
                label: "Students"
              }].map(stat => <div key={stat.label} className="text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-full lg:justify-start">
                  <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>)}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
