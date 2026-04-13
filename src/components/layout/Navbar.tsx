import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Moon, Sun, Search, Home, Clock, Monitor, Briefcase, Users, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import uiLogo from "@/assets/ui-logo-original.png";
import GlobalSearch from "./GlobalSearch";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: {
    label: string;
    href: string;
  }[];
}

const navItems: NavItem[] = [{
  label: "Home",
  href: "/",
  icon: Home,
}, {
  label: "History",
  href: "/history",
  icon: Clock,
}, {
  label: "Departments",
  href: "/departments",
  icon: Monitor,
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
    label: "Software Engineering",
    href: "/departments/software"
  }]
}, {
  label: "Dean's Office",
  href: "/deans-office",
  icon: Briefcase,
  subItems: [{
    label: "Dean's Profile",
    href: "/deans-office/dean"
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
  icon: GraduationCap,
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
    label: "Grading of Courses",
    href: "/students/grading"
  }, {
    label: "Conduct & Discipline",
    href: "/students/conduct"
  }]
}, {
  label: "Alumni",
  href: "/alumni",
  icon: Users,
}];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return <>
    <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <motion.img alt="University of Nigeria - Faculty of Computing" className="h-10 w-10 sm:h-14 sm:w-14 object-contain" whileHover={{
              scale: 1.05
            }} transition={{
              type: "spring",
              stiffness: 300
            }} src={uiLogo} />
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Dark Mode Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDarkMode} 
              className="rounded-full px-2.5 sm:px-3 gap-1.5 sm:gap-2 border-primary/30 bg-primary/5 hover:bg-primary/10 h-9 sm:h-10"
            >
              {darkMode ? (
                <>
                  <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs font-medium hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs font-medium hidden sm:inline">Dark</span>
                </>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant={mobileMenuOpen ? "default" : "ghost"} 
              size="icon" 
              className={`lg:hidden rounded-full h-9 w-9 sm:h-10 sm:w-10 ${mobileMenuOpen ? "bg-primary text-primary-foreground" : ""}`} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Beautiful Full Menu */}
        <AnimatePresence>
          {mobileMenuOpen && <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden overflow-hidden"
          >
            {/* Blue accent bar */}
            <div className="h-1 bg-gradient-sky rounded-full mx-4 mb-3" />
            
            <div className="pb-6 space-y-1 px-1">
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Main nav item */}
                  <div className="flex items-center">
                    <Link 
                      to={item.href} 
                      onClick={() => {
                        if (!item.subItems) setMobileMenuOpen(false);
                      }} 
                      className={`flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all
                        ${location.pathname === item.href 
                          ? "text-primary-foreground bg-primary shadow-md" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5 active:bg-primary/10"}`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                        ${location.pathname === item.href 
                          ? "bg-primary-foreground/20" 
                          : "bg-primary/10"}`}>
                        <item.icon className={`w-4.5 h-4.5 ${location.pathname === item.href ? "text-primary-foreground" : "text-primary"}`} />
                      </div>
                      <span>{item.label}</span>
                    </Link>
                    {item.subItems && (
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="p-3 rounded-xl hover:bg-primary/5 transition-colors"
                      >
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Sub items */}
                  <AnimatePresence>
                    {item.subItems && mobileExpanded === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 mt-1 mb-2 pl-4 border-l-2 border-primary/20 space-y-0.5"
                      >
                        {item.subItems.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.03 }}
                          >
                            <Link 
                              to={subItem.href} 
                              onClick={() => setMobileMenuOpen(false)} 
                              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors
                                ${location.pathname === subItem.href
                                  ? "text-primary font-medium bg-primary/10"
                                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Mobile quick action */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="pt-4 px-3"
              >
                <Link
                  to="/students/admission"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-md text-sm"
                >
                  <GraduationCap className="w-4 h-4" />
                  Apply for Admission
                </Link>
              </motion.div>
            </div>
          </motion.div>}
        </AnimatePresence>
      </nav>
    </header>
  </>;
};

export default Navbar;
