import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, ClipboardCheck, Shield, ExternalLink } from "lucide-react";
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
  <div className="space-y-8">
    <Tabs defaultValue="undergraduate">
      <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
        <TabsTrigger value="undergraduate" className="py-2">Undergraduate</TabsTrigger>
        <TabsTrigger value="postgraduate" className="py-2">Postgraduate</TabsTrigger>
      </TabsList>

      <TabsContent value="undergraduate" className="mt-6">
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Undergraduate Admission</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Faculty of Computing offers undergraduate programs leading to the award of Bachelor of Science (B.Sc.) degrees in Computer Science, Data Science, Information & Communication Technology, and Software Technology.
          </p>
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Requirements</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Five O'Level credits including Mathematics and English Language</li>
              <li>• UTME score meeting the current cut-off mark</li>
              <li>• Post-UTME screening requirements</li>
              <li>• Physics and/or Further Mathematics (recommended)</li>
            </ul>
          </div>
          <Button asChild className="bg-primary hover:bg-primary-dark">
            <a href="https://admissions.ui.edu.ng" target="_blank" rel="noopener noreferrer">
              Apply via UI Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="postgraduate" className="mt-6">
        <div className="glass-card p-8 rounded-2xl space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Postgraduate Admission</h2>
          <p className="text-muted-foreground leading-relaxed">
            The faculty offers M.Sc., M.Phil., and Ph.D. programs in various computing disciplines. Our postgraduate programs are designed to produce researchers and professionals equipped for leadership roles.
          </p>
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">Programs Available</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• M.Sc. Computer Science</li>
              <li>• M.Sc. Data Science</li>
              <li>• M.Sc. Information Technology</li>
              <li>• Ph.D. Computer Science</li>
              <li>• Ph.D. Information Science</li>
            </ul>
          </div>
          <Button asChild className="bg-primary hover:bg-primary-dark">
            <a href="https://spgs.ui.edu.ng" target="_blank" rel="noopener noreferrer">
              Apply via SPGS Portal
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

const Activities = () => (
  <div className="space-y-8">
    <div className="glass-card p-8 rounded-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Lecture Timetable (Sample)</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Lecturer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lectureSchedule.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.venue}</TableCell>
                <TableCell>{item.lecturer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

    <div className="glass-card p-8 rounded-2xl">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Sessional Calendar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sessionalCalendar.map((month) => (
          <div key={month.month} className="p-4 bg-muted rounded-xl">
            <h3 className="font-display font-semibold text-foreground mb-3">{month.month}</h3>
            <ul className="space-y-1">
              {month.events.map((event, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {event}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Registration = () => (
  <div className="glass-card p-8 rounded-2xl text-center">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <ClipboardCheck className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">Course Registration</h2>
      <p className="text-muted-foreground mb-6">
        Course registration is done through the University of Ibadan Student Portal. Please ensure you have completed your fee payment before proceeding with registration.
      </p>
      <Button asChild className="bg-primary hover:bg-primary-dark">
        <a href="https://studentportal.ui.edu.ng" target="_blank" rel="noopener noreferrer">
          Go to Student Portal
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
  </div>
);

const ConductDiscipline = () => (
  <div className="glass-card p-8 rounded-2xl">
    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Rules and Regulations</h2>
    <div className="space-y-6 text-muted-foreground">
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Academic Integrity</h3>
        <p className="leading-relaxed">
          Students are expected to maintain the highest standards of academic integrity. Plagiarism, cheating, and other forms of academic dishonesty are strictly prohibited and will result in disciplinary action.
        </p>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Attendance Policy</h3>
        <p className="leading-relaxed">
          Regular attendance at lectures, tutorials, and laboratory sessions is mandatory. A minimum of 75% attendance is required to be eligible for examinations. Chronic absenteeism may lead to debarment from examinations.
        </p>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">Laboratory Rules</h3>
        <ul className="space-y-2">
          <li>• No food or drinks in the computer laboratories</li>
          <li>• Proper handling of equipment is expected</li>
          <li>• Installation of unauthorized software is prohibited</li>
          <li>• Report any equipment malfunction immediately</li>
        </ul>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-3">General Conduct</h3>
        <ul className="space-y-2">
          <li>• Maintain decorum in all faculty premises</li>
          <li>• Dress appropriately for academic activities</li>
          <li>• Respect staff, fellow students, and visitors</li>
          <li>• Follow all university-wide regulations</li>
        </ul>
      </div>
    </div>
  </div>
);

const subpages = [
  { id: "admission", label: "Admission", icon: GraduationCap },
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "registration", label: "Registration", icon: ClipboardCheck },
  { id: "conduct", label: "Conduct & Discipline", icon: Shield },
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
      case "conduct":
        return <ConductDiscipline />;
      default:
        return <Admission />;
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
              Students
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Everything you need for your academic journey at the Faculty of Computing
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
                to={`/students/${page.id}`}
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

export default Students;
