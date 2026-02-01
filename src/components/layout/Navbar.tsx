import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import uiLogo from "@/assets/ui-logo.png";
interface NavItem {
  label: string;
  href: string;
  subItems?: {
    label: string;
    href: string;
  }[];
}
const navItems: NavItem[] = [{
  label: "Home",
  href: "/"
}, {
  label: "History",
  href: "/history"
}, {
  label: "Departments",
  href: "/departments",
  subItems: [{
    label: "Computer Science & AI",
    href: "/departments/cs-ai"
  }, {
    label: "Data Science",
    href: "/departments/data-science"
  }, {
    label: "ICT",
    href: "/departments/ict"
  }, {
    label: "Software Technology",
    href: "/departments/software"
  }]
}, {
  label: "Dean's Office",
  href: "/deans-office",
  subItems: [{
    label: "Dean's Profile",
    href: "/deans-office/dean"
  }, {
    label: "Faculty Officer",
    href: "/deans-office/faculty-officer"
  }, {
    label: "Faculty Staff",
    href: "/deans-office/staff"
  }, {
    label: "Journals",
    href: "/deans-office/journals"
  }]
}, {
  label: "Students",
  href: "/students",
  subItems: [{
    label: "Admission",
    href: "/students/admission"
  }, {
    label: "Activities",
    href: "/students/activities"
  }, {
    label: "Registration",
    href: "/students/registration"
  }, {
    label: "Conduct & Discipline",
    href: "/students/conduct"
  }]
}, {
  label: "Alumni",
  href: "/alumni"
}];
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img alt="University of Nigeria - Faculty of Computing" className="h-14 w-14 object-contain" whileHover={{
            scale: 1.05
          }} transition={{
            type: "spring",
            stiffness: 300
          }} src="/lovable-uploads/deb05b77-aee7-4244-ba95-6c32f1086eb6.png" />
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                Faculty of Computing
              </h1>
              <p className="text-xs text-muted-foreground">University of Ibadan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => <div key={item.label} className="relative" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={item.href} className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${location.pathname === item.href ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`}>
                  {item.label}
                  {item.subItems && <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.subItems && activeDropdown === item.label && <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: 10
              }} transition={{
                duration: 0.2
              }} className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-xl shadow-elevated overflow-hidden z-50">
                      {item.subItems.map(subItem => <Link key={subItem.href} to={subItem.href} className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                          {subItem.label}
                        </Link>)}
                    </motion.div>}
                </AnimatePresence>
              </div>)}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} className="lg:hidden overflow-hidden">
              <div className="py-4 space-y-2">
                {navItems.map(item => <div key={item.label}>
                    <Link to={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors
                        ${location.pathname === item.href ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-primary/5"}`}>
                      {item.label}
                    </Link>
                    {item.subItems && <div className="ml-4 mt-1 space-y-1">
                        {item.subItems.map(subItem => <Link key={subItem.href} to={subItem.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
                            {subItem.label}
                          </Link>)}
                      </div>}
                  </div>)}
              </div>
            </motion.div>}
        </AnimatePresence>
      </nav>
    </header>;
};
export default Navbar;