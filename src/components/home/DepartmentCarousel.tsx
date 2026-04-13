import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import deptCsAi from "@/assets/dept-cs-ai.jpg";
import deptDataScience from "@/assets/dept-data-science.jpg";
import deptIct from "@/assets/dept-ict.jpg";
import deptSoftware from "@/assets/dept-software.jpg";

const departments = [
  {
    id: "cs-ai",
    name: "Computer Science & Artificial Intelligence",
    shortName: "CS & AI",
    description: "Advancing the frontiers of computing and machine intelligence",
    image: deptCsAi,
    href: "/departments/cs-ai",
  },
  {
    id: "data-science",
    name: "Department of Data Science",
    shortName: "Data Science",
    description: "Transforming data into actionable insights and knowledge",
    image: deptDataScience,
    href: "/departments/data-science",
  },
  {
    id: "ict",
    name: "Information & Communication Technology",
    shortName: "ICT",
    description: "Connecting the world through innovative technology solutions",
    image: deptIct,
    href: "/departments/ict",
  },
  {
    id: "software",
    name: "Software Engineering",
    shortName: "Software Eng",
    description: "Building the software systems that power modern society",
    image: deptSoftware,
    href: "/departments/software",
  },
];

const duplicatedDepartments = [...departments, ...departments];

const DepartmentCarousel = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-muted/50 overflow-hidden relative">
      {/* Blue accent decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-sky" />
      
      <div className="container mx-auto px-4 lg:px-8 mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Academic Departments
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Explore Our Departments
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-2">
            Four specialized departments driving innovation and excellence in computing education
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative animate-marquee-pause">
        <motion.div
          className="flex gap-4 sm:gap-6 animate-marquee"
          style={{ width: "fit-content" }}
        >
          {duplicatedDepartments.map((dept, index) => (
            <Link
              key={`${dept.id}-${index}`}
              to={dept.href}
              className="group flex-shrink-0 w-64 sm:w-80"
            >
              <motion.div
                className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-soft"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={dept.image}
                  alt={dept.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-primary-foreground mb-1.5 sm:mb-2 group-hover:text-primary-light transition-colors">
                    {dept.shortName}
                  </h3>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {dept.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary-light text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DepartmentCarousel;
