import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { FloatingOrbs, AnimatedSeparator, CornerAccent } from "@/components/animations/DecorativeElements";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations/PageTransition";
 import uiLogo from "@/assets/ui-logo-original.png";
 import BackButton from "@/components/layout/BackButton";

const historyContent = [
  {
    title: "The Beginning",
     content: "The Faculty of Computing at the University of Ibadan represents a significant milestone in the advancement of computing education in Nigeria. Established on March 24th, 2025, following approval by the University Senate, the faculty was created to address the growing demand for skilled computing professionals in the country and beyond.",
    year: "Foundation",
  },
  {
    title: "Early Development",
     content: "Computing education at the University of Ibadan has deep roots in the early adoption of computer technology in Nigerian universities. The B.Sc. Computer Science programme has been offered at UI for decades, building a strong foundation of excellence that evolved into this full-fledged Faculty of Computing.",
    year: "Growth",
  },
  {
    title: "Expansion and Growth",
     content: "The faculty offers five undergraduate programmes across four specialized departments: Computer Science (Dept. of CS & AI), Data Science, Cybersecurity, ICT (Dept. of ICT), and Software Engineering. This structure reflects the evolving landscape of the computing industry.",
    year: "Expansion",
  },
  {
    title: "Research and Innovation",
     content: "The Faculty of Computing has established itself as a center for research excellence. Faculty members and students contribute to groundbreaking research in artificial intelligence, machine learning, cybersecurity, data analytics, and software engineering.",
    year: "Innovation",
  },
  {
    title: "Present Day",
     content: "Under the leadership of Dean Prof. A. B. Adeyemo, the Faculty of Computing stands as a beacon of excellence in computing education. Our graduates make significant contributions to the technology sector in Nigeria and internationally.",
    year: "Today",
  },
  {
    title: "Vision for the Future",
     content: "Looking ahead, we are committed to remaining at the forefront of computing education and research. Our vision encompasses expanding postgraduate programmes, enhancing research capabilities, and strengthening industry partnerships.",
    year: "Future",
  },
];

const History = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative py-24 lg:py-32 bg-gradient-sky overflow-hidden">
        <FloatingOrbs />
        <div className="absolute inset-0 circuit-bg opacity-10" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <motion.img
              alt="UI Logo"
              className="w-24 h-24 object-contain mb-6"
               src={uiLogo}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            />
            <motion.h1
              className="font-display text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Computing UI History
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              A journey through the establishment and growth of computing education at the University of Ibadan
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* History Content - Timeline Style */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
           <BackButton />
 
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical timeline line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-accent hidden md:block"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <StaggerContainer className="space-y-12" staggerDelay={0.15}>
              {historyContent.map((item, index) => (
                <StaggerItem key={item.title}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    {/* Year badge - centered on timeline */}
                    <motion.div
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 z-10"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-bold shadow-lg">
                        {item.year}
                      </span>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className={`flex-1 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
                        <CornerAccent position={index % 2 === 0 ? "top-right" : "top-left"} />
                        
                        {/* Mobile year badge */}
                        <span className="md:hidden inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold mb-4">
                          {item.year}
                        </span>
                        
                        <h2 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {item.title}
                        </h2>
                        <p className="leading-relaxed text-muted-foreground">
                          {item.content}
                        </p>

                        {/* Hover accent line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-gold"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Bottom decoration */}
          <FadeIn delay={0.5} className="mt-16">
            <AnimatedSeparator className="max-w-md mx-auto" />
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default History;
