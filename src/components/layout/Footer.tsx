import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import uiLogo from "@/assets/ui-logo.png";

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
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-dark text-secondary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={uiLogo}
                alt="UI Logo"
                className="h-16 w-16 object-contain"
              />
              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  Faculty of Computing
                </h3>
                <p className="text-sm text-white/60">University of Ibadan</p>
              </div>
            </Link>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">
              Advancing knowledge and innovation in computing sciences through excellence in teaching, research, and community service.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* University Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">University Links</h4>
            <ul className="space-y-3">
              {universityLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/70">
                  Faculty of Computing Building,<br />
                  University of Ibadan,<br />
                  Ibadan, Oyo State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+2348012345678"
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:computing@ui.edu.ng"
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  computing@ui.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 text-center md:text-left">
              © {new Date().getFullYear()} Faculty of Computing, University of Ibadan. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
