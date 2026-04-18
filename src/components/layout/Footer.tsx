import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import uiLogo from "@/assets/ui-logo-original.png";
import campusBuildings from "@/assets/campus-buildings.jpg";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "History", href: "/history" },
    { label: "Departments", href: "/departments" },
    { label: "Dean's Office", href: "/deans-office" },
    { label: "Students", href: "/students" },
    { label: "Alumni", href: "/alumni" },
  ];
  const universityLinks = [
    { label: "UI Website", href: "https://ui.edu.ng", external: true },
    { label: "UI Bulletin", href: "https://bulletin.ui.edu.ng", external: true },
    { label: "LMS Portal", href: "https://lms.ui.edu.ng", external: true },
    { label: "UI Mail", href: "https://mail.ui.edu.ng", external: true },
    { label: "Student Portal", href: "https://studentportal.ui.edu.ng", external: true },
  ];
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/UNIIbadan/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/Unibadan", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/universityofibadan/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/school/university-of-ibadan/", label: "LinkedIn" },
  ];

  return <footer className="relative text-secondary-foreground">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={campusBuildings} alt="" className="w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-secondary/95 dark:bg-secondary/95" />
    </div>

    {/* Main Footer */}
    <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-16 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {/* Brand Column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-4 sm:mb-6">
            <img alt="UI Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" src={uiLogo} />
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-primary-foreground dark:text-white/90">
              Faculty of Computing
            </h3>
            <p className="text-xs sm:text-sm text-primary-foreground dark:text-white/70">University of Ibadan</p>
          </div>
        </Link>
        <p className="text-xs sm:text-sm text-primary-foreground dark:text-white/75 mb-4 sm:mb-6 leading-relaxed">
          Advancing knowledge and innovation in computing sciences through excellence in teaching, research, and community service.
        </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {socialLinks.map(social => <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 dark:bg-white/15 flex items-center justify-center text-primary-foreground dark:text-white hover:bg-primary hover:text-primary-foreground transition-colors" whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.95
            }} aria-label={social.label}>
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>)}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4 sm:mb-6 text-sm sm:text-base dark:text-white">Quick Links</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            {quickLinks.map(link => <li key={link.href}>
              <Link to={link.href} className="text-xs sm:text-sm text-primary-foreground dark:text-white/75 hover:text-primary dark:hover:text-accent-gold transition-colors inline-flex items-center gap-2">
                {link.label}
              </Link>
            </li>)}
          </ul>
        </div>

        {/* University Links */}
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4 sm:mb-6 text-sm sm:text-base dark:text-white">University Links</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            {universityLinks.map(link => <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary-foreground dark:text-white/75 hover:text-primary dark:hover:text-accent-gold transition-colors inline-flex items-center gap-2">
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>)}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-display font-semibold text-primary-foreground mb-4 sm:mb-6 text-sm sm:text-base dark:text-white">Contact Us</h4>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-accent-gold mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-primary-foreground dark:text-white/75">
                Faculty of Computing Building,<br />
                University of Ibadan,<br />
                Ibadan, Oyo State, Nigeria
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-accent-gold flex-shrink-0" />
              <a href="tel:+2348012345678" className="text-xs sm:text-sm text-primary-foreground dark:text-white/75 hover:text-primary dark:hover:text-accent-gold transition-colors">
                +234 801 234 5678
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-accent-gold flex-shrink-0" />
              <a href="mailto:computing@ui.edu.ng" className="text-xs sm:text-sm text-primary-foreground dark:text-white/75 hover:text-primary dark:hover:text-accent-gold transition-colors">
                computing@ui.edu.ng
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-primary-foreground/20 dark:border-white/20 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-primary-foreground dark:text-white/60 text-center sm:text-left">
            © {new Date().getFullYear()} Nwamauzor Emmanuel Chidera. All rights reserved. Faculty of Computing, University of Ibadan.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-primary-foreground dark:text-white/60">
            <Link to="/privacy" className="hover:text-primary dark:hover:text-accent-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary dark:hover:text-accent-gold transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footer;
