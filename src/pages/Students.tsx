import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, ClipboardCheck, Shield, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AnimatedCard } from "@/components/animations/DecorativeElements";
import { StaggerContainer, StaggerItem, FadeIn, ScaleIn } from "@/components/animations/PageTransition";
import BackButton from "@/components/layout/BackButton";
import campusBuildings from "@/assets/campus-buildings.jpg";

// Demo lecture timetable
const lectureSchedule = [
  { day: "Monday", time: "8:00 - 10:00", course: "CSC 301", venue: "LT1", lecturer: "Dr. Okonkwo" },
  { day: "Monday", time: "10:00 - 12:00", course: "CSC 305", venue: "LT2", lecturer: "Prof. Adeyemo" },
  { day: "Tuesday", time: "8:00 - 10:00", course: "CSC 303", venue: "Lab A", lecturer: "Dr. Eze" },
  { day: "Tuesday", time: "14:00 - 16:00", course: "CSC 307", venue: "LT1", lecturer: "Dr. Ibrahim" },
  { day: "Wednesday", time: "10:00 - 12:00", course: "CSC 309", venue: "LT3", lecturer: "Prof. Adeyemo" },
  { day: "Thursday", time: "8:00 - 10:00", course: "CSC 301", venue: "Lab B", lecturer: "Dr. Okonkwo" },
  { day: "Friday", time: "12:00 - 14:00", course: "CSC 311", venue: "LT2", lecturer: "Dr. Eze" },
];

// Demo sessional calendar
const sessionalCalendar = [
  { month: "September", events: ["Resumption of Academic Activities", "Registration Begins", "Orientation Week"] },
  { month: "October", events: ["Lectures Begin", "Add/Drop Period Ends", "First CA Tests"] },
  { month: "November", events: ["Mid-Semester Break", "Second CA Tests"] },
  { month: "December", events: ["End of First Semester Lectures", "Revision Week", "First Semester Examinations"] },
  { month: "January", events: ["Semester Break", "Second Semester Registration"] },
  { month: "February", events: ["Second Semester Lectures Begin", "First CA Tests"] },
  { month: "March", events: ["Mid-Semester Break", "Second CA Tests"] },
  { month: "April", events: ["End of Lectures", "Revision Week", "Second Semester Examinations"] },
];

const Admission = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <Tabs defaultValue="undergraduate">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
          <TabsTrigger value="undergraduate" className="py-2 text-xs sm:text-sm">Undergraduate</TabsTrigger>
          <TabsTrigger value="postgraduate" className="py-2 text-xs sm:text-sm">Postgraduate</TabsTrigger>
        </TabsList>

        <TabsContent value="undergraduate" className="mt-4 sm:mt-6">
          <motion.div
            className="glass-card p-4 sm:p-8 rounded-2xl space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FadeIn>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Undergraduate Admission</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                The Faculty of Computing offers undergraduate programs leading to the award of Bachelor of Science (B.Sc.) degrees in Computer Science, Data Science, Cybersecurity, Information & Communication Technology, and Software Engineering.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">Requirements</h3>
                <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                  {[
                    "Five O'Level credits including Mathematics and English Language",
                    "UTME score meeting the current cut-off mark",
                    "Post-UTME screening requirements",
                    "Physics and/or Further Mathematics (recommended)",
                  ].map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      • {req}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild className="bg-primary hover:bg-primary-dark text-sm sm:text-base">
                <a href="https://admissions.ui.edu.ng" target="_blank" rel="noopener noreferrer">
                  Apply via UI Portal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="postgraduate" className="mt-4 sm:mt-6">
          <motion.div
            className="glass-card p-4 sm:p-8 rounded-2xl space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground">Postgraduate Admission</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              The faculty offers M.Sc., M.Phil., and Ph.D. programs in various computing disciplines. Our postgraduate programs are designed to produce researchers and professionals equipped for leadership roles.
            </p>
            <div className="space-y-4">
              <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">Programs Available</h3>
              <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                {[
                  "M.Sc. Computer Science",
                  "M.Sc. Data Science",
                  "M.Sc. Information Technology",
                  "Ph.D. Computer Science",
                  "Ph.D. Information Science",
                ].map((program, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    • {program}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="bg-primary hover:bg-primary-dark text-sm sm:text-base">
                <a href="https://spgs.ui.edu.ng" target="_blank" rel="noopener noreferrer">
                  Apply via SPGS Portal
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </StaggerItem>
  </StaggerContainer>
);

const Activities = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Lecture Timetable (Sample)</h2>
        </FadeIn>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Day</TableHead>
                  <TableHead className="text-xs sm:text-sm">Time</TableHead>
                  <TableHead className="text-xs sm:text-sm">Course</TableHead>
                  <TableHead className="text-xs sm:text-sm">Venue</TableHead>
                  <TableHead className="text-xs sm:text-sm">Lecturer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lectureSchedule.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b transition-colors hover:bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ backgroundColor: "hsl(42 92% 56% / 0.05)" }}
                  >
                    <TableCell className="font-medium text-xs sm:text-sm">{item.day}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{item.time}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{item.course}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{item.venue}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{item.lecturer}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </StaggerItem>

    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Sessional Calendar</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sessionalCalendar.map((month, monthIndex) => (
            <motion.div
              key={month.month}
              className="p-4 bg-muted rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: monthIndex * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -10px hsl(42 92% 56% / 0.2)",
              }}
            >
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm sm:text-base">{month.month}</h3>
              <ul className="space-y-1">
                {month.events.map((event, index) => (
                  <motion.li
                    key={index}
                    className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    />
                    {event}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </StaggerItem>
  </StaggerContainer>
);

const Registration = () => (
  <ScaleIn>
    <div className="glass-card p-6 sm:p-8 rounded-2xl text-center">
      <div className="max-w-md mx-auto">
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6"
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 hsl(42 92% 56% / 0.4)",
              "0 0 0 20px hsl(42 92% 56% / 0)",
              "0 0 0 0 hsl(42 92% 56% / 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
        </motion.div>
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Course Registration</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Course registration is done through the University of Ibadan Student Portal. Please ensure you have completed your fee payment before proceeding with registration.
          </p>
        </FadeIn>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="bg-primary hover:bg-primary-dark">
            <a href="https://studentportal.ui.edu.ng" target="_blank" rel="noopener noreferrer">
              Go to Student Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  </ScaleIn>
);

const ConductDiscipline = () => {
  const misconducts = [
    "All examination misconducts (See regulations on examinations)",
    "Unruly behaviour",
    "Indecent behaviour",
    "Vandalism",
    "Indecent dressing",
    "Miscellaneous Hall offences",
    "Unauthorized use/displacement/damage to University property Pilfering",
    "Insubordination",
    "Direct sale of bed spaces/squatting in Halls of Residence",
    "Illegal participation in the National Youth Service programme",
    "Infringements of other University regulations",
  ];

  const criminalOffences = [
    "Burglary",
    "Physical assaults on or fighting with fellow students",
    "Fraud",
    "Theft",
    "Membership of a secret cult inside or outside the campus Possession of fire arms",
    "Murder",
    "Arson",
    "Rape",
    "Possession and/or use of hard Drug and Drug trafficking",
    "Other criminal offences",
  ];

  const toRoman = (num: number): string => {
    const romanNumerals = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv', 'xv'];
    return romanNumerals[num] || String(num + 1);
  };

  return (
    <FadeIn>
      <div className="glass-card p-4 sm:p-8 rounded-2xl space-y-6 sm:space-y-8">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            Student General Conducts and Discipline
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
            All students are expected to comport themselves in a good manner in the Department. Students are to refrain from the following misconducts while in the University:
          </p>

          <StaggerContainer className="space-y-2 text-muted-foreground" staggerDelay={0.05}>
            {misconducts.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div className="flex items-start gap-3 text-sm sm:text-base" whileHover={{ x: 5 }}>
                  <span className="text-primary font-semibold min-w-[32px]">{toRoman(index)})</span>
                  <span>{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
            In addition, students must also refrain from the following criminal offences:
          </p>
          <StaggerContainer className="space-y-2 text-muted-foreground" staggerDelay={0.05}>
            {criminalOffences.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div className="flex items-start gap-3 text-sm sm:text-base" whileHover={{ x: 5 }}>
                  <span className="text-primary font-semibold min-w-[32px]">{toRoman(index)})</span>
                  <span>{item}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <motion.div
          className="p-4 sm:p-6 bg-destructive/10 border border-destructive/20 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-base text-foreground font-medium">
            ⚠️ Students caught carrying out any of these offences or misconducts will be sent to the Student Disciplinary Committee without any hesitation for appropriate sanction(s).
          </p>
        </motion.div>
      </div>
    </FadeIn>
  );
};

// Grading data
const letterGrades = [
  { grade: "A", point: 5, mark: "70 - 100" },
  { grade: "B", point: 4, mark: "60 - 69" },
  { grade: "C", point: 3, mark: "50 - 59" },
  { grade: "D", point: 2, mark: "45 - 49" },
  { grade: "E", point: 1, mark: "40 - 44" },
  { grade: "F", point: 0, mark: "0 - 39" },
];

const degreeClasses = [
  { cgpa: "4.50 - 5.00", classification: "First Class" },
  { cgpa: "3.50 - 4.49", classification: "Second Class Upper" },
  { cgpa: "2.40 - 3.49", classification: "Second Class Lower" },
  { cgpa: "1.50 - 2.39", classification: "Third Class" },
  { cgpa: "1.00 - 1.49", classification: "Pass" },
];

const Grading = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Grading of Courses</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            The grading system used by the Faculty of Computing follows the University of Ibadan's standard grading policy.
          </p>
        </FadeIn>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[400px] sm:min-w-0 px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Letter Grade</TableHead>
                  <TableHead className="text-xs sm:text-sm">Grade Point</TableHead>
                  <TableHead className="text-xs sm:text-sm">Mark (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {letterGrades.map((item, index) => (
                  <motion.tr
                    key={item.grade}
                    className="border-b transition-colors hover:bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "hsl(42 92% 56% / 0.05)" }}
                  >
                    <TableCell className="font-semibold text-primary text-sm sm:text-base">{item.grade}</TableCell>
                    <TableCell className="text-sm sm:text-base">{item.point}</TableCell>
                    <TableCell className="text-sm sm:text-base">{item.mark}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </StaggerItem>

    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <FadeIn>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Class of Degree</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            The class of degree awarded is based on the Cumulative Grade Point Average (CGPA) at graduation.
          </p>
        </FadeIn>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-[300px] sm:min-w-0 px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">CGPA</TableHead>
                  <TableHead className="text-xs sm:text-sm">Classification</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {degreeClasses.map((item, index) => (
                  <motion.tr
                    key={item.cgpa}
                    className="border-b transition-colors hover:bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "hsl(42 92% 56% / 0.05)" }}
                  >
                    <TableCell className="font-medium text-sm sm:text-base">{item.cgpa}</TableCell>
                    <TableCell className="text-sm sm:text-base">{item.classification}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </StaggerItem>
  </StaggerContainer>
);

const subpages = [
  { id: "admission", label: "Admission", icon: GraduationCap },
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "registration", label: "Registration", icon: ClipboardCheck },
  { id: "grading", label: "Grading", icon: BookOpen },
  { id: "conduct", label: "Conduct", icon: Shield },
];

const Students = () => {
  const { subpage } = useParams();
  const currentSubpage = subpage || "admission";

  const renderContent = () => {
    switch (currentSubpage) {
      case "admission":
        return <Admission />;
      case "activities":
        return <Activities />;
      case "registration":
        return <Registration />;
      case "grading":
        return <Grading />;
      case "conduct":
        return <ConductDiscipline />;
      default:
        return <Admission />;
    }
  };

  return (
    <Layout>
      {/* Hero Banner with Image Background */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={campusBuildings} 
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
              Students
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Resources and information for current and prospective students
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
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/students/${page.id}`}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
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
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Students;
