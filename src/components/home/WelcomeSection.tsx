import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import deanPhoto from "@/assets/dean-photo.jpg";

const WelcomeSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Welcome Message
            </span>
            
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Welcome to the Faculty of Computing
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It is my distinct pleasure to welcome you to the Faculty of Computing, 
                University of Ibadan. Our faculty is committed to producing world-class 
                graduates who are equipped with cutting-edge skills in computing and 
                information technology.
              </p>
              <p>
                We pride ourselves on our exceptional faculty members, state-of-the-art 
                facilities, and a curriculum that is continuously updated to meet the 
                evolving demands of the global technology landscape.
              </p>
              <p>
                Whether you are a prospective student, current student, alumnus, or 
                industry partner, we invite you to explore our programs and discover the 
                opportunities that await you at the Faculty of Computing.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <Button className="bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground font-semibold px-6 py-3 h-auto rounded-lg shadow-md hover:shadow-lg transition-all group">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-sky rounded-2xl opacity-10 blur-2xl" />
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={deanPhoto}
                  alt="Faculty Officer"
                  className="w-full aspect-[4/5] object-cover"
                />
                
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
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg font-display font-semibold text-sm"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Est. 2023
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
