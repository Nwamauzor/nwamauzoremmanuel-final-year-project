import { useParams, Link } from "react-router-dom";
import AiPageSummary from "@/components/ai/AiPageSummary";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Home, Handshake, Users, GraduationCap, Award, Briefcase } from "lucide-react";
import { AnimatedCard } from "@/components/animations/DecorativeElements";
import { StaggerContainer, StaggerItem, FadeIn, ScaleIn } from "@/components/animations/PageTransition";
import BackButton from "@/components/layout/BackButton";
import campusSignpost from "@/assets/campus-signpost.jpg";

const AlumniHome = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl relative overflow-hidden">
        <FadeIn direction="left">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Welcome to Alumni Network</h2>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
            The Faculty of Computing Alumni Association connects graduates from all our programs, providing networking opportunities, career support, and ways to give back to the faculty. Our alumni are making significant contributions in technology, academia, business, and public service across Nigeria and around the world.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Users, value: "5,000+", label: "Registered Alumni" },
            { icon: GraduationCap, value: "30+", label: "Years of Excellence" },
            { icon: Briefcase, value: "200+", label: "Partner Companies" },
          ].map((stat, index) => (
            <ScaleIn key={stat.label} delay={0.2 + index * 0.1}>
              <motion.div
                className="p-4 sm:p-6 bg-muted rounded-xl text-center"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px -10px hsl(42 92% 56% / 0.2)",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
                <motion.p
                  className="font-display text-xl sm:text-2xl font-bold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </StaggerItem>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <AnimatedCard delay={0.3} className="glass-card p-4 sm:p-6 rounded-2xl">
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">Notable Alumni</h3>
        <div className="space-y-4">
          {[
            { name: "Dr. Adaeze Nwosu", role: "CTO, Tech Nigeria" },
            { name: "Engr. Chukwuma Eze", role: "CEO, Software Solutions Ltd" },
            { name: "Prof. Fatima Ibrahim", role: "Dean, Federal University" },
          ].map((alumni, index) => (
            <motion.div
              key={alumni.name}
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "hsl(42 92% 56% / 0.2)" }}
              >
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
              <div>
                <p className="font-medium text-foreground text-sm sm:text-base">{alumni.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{alumni.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>

      <AnimatedCard delay={0.4} className="glass-card p-4 sm:p-6 rounded-2xl">
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
        <div className="space-y-3 sm:space-y-4">
          {[
            { event: "Annual Alumni Dinner & Awards Night", date: "July 19, 2026" },
            { event: "Career Mentorship & Networking Summit", date: "September 12, 2026" },
            { event: "Homecoming Weekend & Faculty Tour", date: "November 21-23, 2026" },
          ].map((item, index) => (
            <motion.div
              key={item.event}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-muted rounded-lg gap-1 sm:gap-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                backgroundColor: "hsl(42 92% 56% / 0.1)",
              }}
            >
              <span className="font-medium text-foreground text-sm sm:text-base">{item.event}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  </StaggerContainer>
);

const AlumniServices = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Services Rendered in Alumni Relation Office</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              title: "Transcript Services",
              description: "Fast-track processing of academic transcripts for alumni pursuing further studies or employment verification.",
            },
            {
              title: "Reference Letters",
              description: "Facilitation of academic and professional reference letters from faculty members.",
            },
            {
              title: "Career Support",
              description: "Job placement assistance, resume reviews, and connections with industry partners.",
            },
            {
              title: "Networking Events",
              description: "Regular meetups, conferences, and social events to keep alumni connected.",
            },
            {
              title: "Mentorship Programs",
              description: "Connect current students with successful alumni for career guidance and mentoring.",
            },
            {
              title: "Giving Back",
              description: "Opportunities to contribute to scholarships, research funding, and faculty development.",
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              className="p-4 sm:p-6 bg-muted rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 15px 30px -10px hsl(224 50% 10% / 0.15)",
              }}
            >
              <motion.h3
                className="font-display text-base sm:text-lg font-semibold text-foreground mb-2"
                whileHover={{ color: "hsl(42 92% 56%)" }}
              >
                {service.title}
              </motion.h3>
              <p className="text-muted-foreground text-xs sm:text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </StaggerItem>

    <FadeIn delay={0.3}>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4">Contact Alumni Office</h3>
        <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
          <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <strong className="text-foreground">Email:</strong> alumni.computing@ui.edu.ng
          </motion.p>
          <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <strong className="text-foreground">Phone:</strong> +234 801 234 5678
          </motion.p>
          <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <strong className="text-foreground">Office Hours:</strong> Monday - Friday, 9:00 AM - 4:00 PM
          </motion.p>
          <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <strong className="text-foreground">Location:</strong> Room 105, Faculty of Computing Building
          </motion.p>
        </div>
      </div>
    </FadeIn>
  </StaggerContainer>
);

const subpages = [
  { id: "home", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: Handshake },
];

const Alumni = () => {
  const { subpage } = useParams();
  const currentSubpage = subpage || "home";

  const renderContent = () => {
    switch (currentSubpage) {
      case "home":
        return <AlumniHome />;
      case "services":
        return <AlumniServices />;
      default:
        return <AlumniHome />;
    }
  };

  return (
    <Layout>
      {/* Hero Banner with Image Background */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={campusSignpost} 
            alt="Faculty of Computing Campus" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Alumni
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Stay connected with the Faculty of Computing community
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-border bg-card sticky top-20 z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {subpages.map((page, index) => (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/alumni/${page.id}`}
                  className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    currentSubpage === page.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <page.icon className="w-4 h-4" />
                  {page.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <BackButton />
          <AiPageSummary pageName="Alumni Network" pagePath="/alumni" pageContext="Faculty of Computing alumni community, 5000+ graduates, mentorship, events" />
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Alumni;
