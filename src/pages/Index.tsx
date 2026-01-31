import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import DepartmentCarousel from "@/components/home/DepartmentCarousel";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "World-Class Education",
    description: "Cutting-edge curriculum designed to meet global standards and industry demands.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    description: "Learn from renowned professors and industry experts with decades of experience.",
  },
  {
    icon: BookOpen,
    title: "Research Excellence",
    description: "Engage in groundbreaking research that shapes the future of computing.",
  },
  {
    icon: Award,
    title: "Career Success",
    description: "Our graduates excel in top tech companies and institutions worldwide.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Star Graphic */}
      <HeroSection />

      {/* Welcome Section */}
      <WelcomeSection />

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Excellence in Computing Education
            </h2>
            <p className="text-muted-foreground">
              Discover what makes the Faculty of Computing your ideal destination for academic and professional growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elevated hover:border-primary/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Carousel */}
      <DepartmentCarousel />

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-sky relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 circuit-bg" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Shape Your Future in Computing?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of students who have launched successful careers through our world-class programs. 
              Applications are now open for the next academic session.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/students/admission"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Apply for Admission
              </a>
              <a
                href="/deans-office"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
