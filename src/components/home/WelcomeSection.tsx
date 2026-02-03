import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronUp } from "lucide-react";
import deanPhoto from "@/assets/dean-photo.jpg";

const WelcomeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortMessage = `At the Faculty of Computing, we are committed to expanding the frontiers of knowledge by providing an excellent environment for learning, research, and innovation. Guided by the University of Ibadan's mission to produce graduates of sound judgment and exemplary character, we strive to contribute meaningfully to societal transformation through creativity, ethical leadership, and cutting-edge technology.`;

  const fullMessage = `At the Faculty of Computing, we are committed to expanding the frontiers of knowledge by providing an excellent environment for learning, research, and innovation. Guided by the University of Ibadan's mission to produce graduates of sound judgment and exemplary character, we strive to contribute meaningfully to societal transformation through creativity, ethical leadership, and cutting-edge technology.

Our faculty is dedicated to advancing knowledge and innovation in computing by delivering world-class, industry-relevant education, fostering groundbreaking research, and building strong partnerships with industry and society. We empower our students to become future-ready leaders in technology, equipped with technical expertise, problem-solving skills, and a strong ethical foundation.

Here, you will:
• Engage in high-impact research that addresses global challenges.
• Collaborate with industry leaders to bridge academia and real-world applications.
• Develop entrepreneurial and leadership skills to thrive in the digital economy.
• Champion diversity, inclusivity, and responsible computing for a sustainable future.

Whether you are a student, researcher, industry partner, or visitor, we invite you to join us in shaping the future of computing—where knowledge, innovation, and societal impact converge.

Welcome to a world of limitless possibilities at the Faculty of Computing, University of Ibadan!

Excellence. Innovation. Leadership.`;

  return <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Welcome Message
            </span>
            
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Welcome to the Faculty of Computing
            </h2>
            
            <div className="text-muted-foreground leading-relaxed">
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 whitespace-pre-line"
                  >
                    <p>{fullMessage}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{shortMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }} className="mt-8">
              <Button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground font-semibold px-6 py-3 h-auto rounded-lg shadow-md hover:shadow-lg transition-all group"
              >
                {isExpanded ? "Show Less" : "Read More"}
                {isExpanded ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </motion.div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Prof. A. B. Adeyemo</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Dean, Faculty of Computing
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="relative">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-sky rounded-2xl opacity-10 blur-2xl" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img src={deanPhoto} alt="Faculty Officer" className="w-full aspect-[4/5] object-cover" />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-display font-semibold text-lg">
                    Prof. A. B. Adeyemo
                  </p>
                  <p className="text-white/80 text-sm">
                    Dean, Faculty of Computing
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg font-display font-semibold text-sm" animate={{
              y: [0, -5, 0]
            }} transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                Est. 2023
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default WelcomeSection;