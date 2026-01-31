import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Home, Handshake, Users, GraduationCap, Award, Briefcase } from "lucide-react";

const AlumniHome = () => (
  <div className="space-y-8">
    <div className="glass-card p-8 rounded-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Welcome to Alumni Network</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        The Faculty of Computing Alumni Association connects graduates from all our programs, providing networking opportunities, career support, and ways to give back to the faculty. Our alumni are making significant contributions in technology, academia, business, and public service across Nigeria and around the world.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Users, value: "5,000+", label: "Registered Alumni" },
          { icon: GraduationCap, value: "30+", label: "Years of Excellence" },
          { icon: Briefcase, value: "200+", label: "Partner Companies" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-muted rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Notable Alumni</h3>
        <div className="space-y-4">
          {[
            { name: "Dr. Adaeze Nwosu", role: "CTO, Tech Nigeria" },
            { name: "Engr. Chukwuma Eze", role: "CEO, Software Solutions Ltd" },
            { name: "Prof. Fatima Ibrahim", role: "Dean, Federal University" },
          ].map((alumni) => (
            <div key={alumni.name} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{alumni.name}</p>
                <p className="text-sm text-muted-foreground">{alumni.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {[
            { event: "Annual Alumni Dinner", date: "December 15, 2024" },
            { event: "Career Mentorship Program", date: "January 10, 2025" },
            { event: "Homecoming Weekend", date: "March 20-22, 2025" },
          ].map((item) => (
            <div key={item.event} className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="font-medium text-foreground">{item.event}</span>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AlumniServices = () => (
  <div className="space-y-8">
    <div className="glass-card p-8 rounded-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Services Rendered in Alumni Relation Office</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        ].map((service) => (
          <div key={service.title} className="p-6 bg-muted rounded-xl">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="glass-card p-8 rounded-2xl">
      <h3 className="font-display text-xl font-bold text-foreground mb-4">Contact Alumni Office</h3>
      <div className="space-y-3 text-muted-foreground">
        <p><strong className="text-foreground">Email:</strong> alumni.computing@ui.edu.ng</p>
        <p><strong className="text-foreground">Phone:</strong> +234 801 234 5678</p>
        <p><strong className="text-foreground">Office Hours:</strong> Monday - Friday, 9:00 AM - 4:00 PM</p>
        <p><strong className="text-foreground">Location:</strong> Room 105, Faculty of Computing Building</p>
      </div>
    </div>
  </div>
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
      {/* Hero Banner */}
      <section className="relative py-24 lg:py-32 bg-gradient-sky overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Alumni
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Stay connected with the Faculty of Computing community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-border bg-card sticky top-20 z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {subpages.map((page) => (
              <Link
                key={page.id}
                to={`/alumni/${page.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSubpage === page.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <page.icon className="w-4 h-4" />
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Alumni;
