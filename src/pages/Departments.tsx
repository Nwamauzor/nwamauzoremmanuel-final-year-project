import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Database, Wifi, Code } from "lucide-react";
import deptCsAi from "@/assets/dept-cs-ai.jpg";
import deptDataScience from "@/assets/dept-data-science.jpg";
import deptIct from "@/assets/dept-ict.jpg";
import deptSoftware from "@/assets/dept-software.jpg";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const departments = [{
  id: "cs-ai",
  name: "Computer Science & Artificial Intelligence",
  shortName: "CS & AI",
  icon: Cpu,
  image: deptCsAi,
  description: "Pioneering research and education in computing and machine intelligence",
  color: "from-blue-500 to-cyan-400"
}, {
  id: "data-science",
  name: "Department of Data Science",
  shortName: "Data Science",
  icon: Database,
  image: deptDataScience,
  description: "Transforming data into actionable insights and knowledge",
  color: "from-purple-500 to-blue-400"
}, {
  id: "ict",
  name: "Information & Communication Technology",
  shortName: "ICT",
  icon: Wifi,
  image: deptIct,
  description: "Connecting the world through innovative technology solutions",
  color: "from-teal-500 to-green-400"
}, {
  id: "software",
  name: "Software Technology",
  shortName: "Software Tech",
  icon: Code,
  image: deptSoftware,
  description: "Building the software systems that power modern society",
  color: "from-orange-500 to-yellow-400"
}];

// Demo course data
const courses100L = {
  first: [{
    code: "CSC 101",
    title: "Introduction to Computer Science",
    unit: 3,
    status: "Required"
  }, {
    code: "CSC 102",
    title: "Programming Fundamentals",
    unit: 3,
    status: "Required"
  }, {
    code: "MTH 101",
    title: "Elementary Mathematics I",
    unit: 3,
    status: "Compulsory"
  }, {
    code: "PHY 101",
    title: "General Physics I",
    unit: 3,
    status: "Compulsory"
  }, {
    code: "GES 101",
    title: "Use of English I",
    unit: 2,
    status: "Compulsory"
  }],
  second: [{
    code: "CSC 103",
    title: "Introduction to Problem Solving",
    unit: 3,
    status: "Required"
  }, {
    code: "CSC 104",
    title: "Programming with Python",
    unit: 3,
    status: "Required"
  }, {
    code: "MTH 102",
    title: "Elementary Mathematics II",
    unit: 3,
    status: "Compulsory"
  }, {
    code: "PHY 102",
    title: "General Physics II",
    unit: 3,
    status: "Compulsory"
  }, {
    code: "GES 102",
    title: "Use of English II",
    unit: 2,
    status: "Compulsory"
  }]
};

// Demo staff data
const staffData = [{
  name: "Prof. John Adebayo",
  qualification: "Ph.D Computer Science (MIT)",
  designation: "Professor",
  specialization: "Artificial Intelligence"
}, {
  name: "Dr. Mary Okonkwo",
  qualification: "Ph.D Data Science (Stanford)",
  designation: "Senior Lecturer",
  specialization: "Machine Learning"
}, {
  name: "Dr. Samuel Eze",
  qualification: "Ph.D Software Engineering (CMU)",
  designation: "Lecturer I",
  specialization: "Software Architecture"
}, {
  name: "Mr. David Olamide",
  qualification: "M.Sc Computer Science (UI)",
  designation: "Lecturer II",
  specialization: "Network Security"
}];
const DepartmentDetail = ({
  deptId
}: {
  deptId: string;
}) => {
  const dept = departments.find(d => d.id === deptId);
  if (!dept) return null;
  return <div className="space-y-12">
      {/* Department Hero */}
      <section className="relative h-80 rounded-2xl overflow-hidden">
        <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
              <dept.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-white">
                {dept.name}
              </h1>
              <p className="text-white/80">{dept.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-1 bg-muted">
          <TabsTrigger value="history" className="py-2">History</TabsTrigger>
          <TabsTrigger value="welcome" className="py-2">Welcome</TabsTrigger>
          <TabsTrigger value="hod" className="py-2">HOD Profile</TabsTrigger>
          <TabsTrigger value="courses" className="py-2">Courses</TabsTrigger>
          <TabsTrigger value="staff" className="py-2">Staff</TabsTrigger>
          <TabsTrigger value="contact" className="py-2">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Department History</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Senate of the University of Ibadan approved the proposal for a Faculty of Computing on March 24th 2025 with four new departments and four new programmes in addition to the existing programme in Computer Science. The departments in the Faculty of Computing and the programmes are: Department of Computer Science and Artificial Intelligence which offers the B.Sc. Computer Science programme, Department of Data Science programme, which offers the B.Sc. Data Science programme, Department of Information and Communications Technology which offers the B.Sc. Cybersecurity, and the B.Sc. Information and Communications Technology programmes, and the Department of Software Engineering which offers the B.Sc. Software Engineering programme.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="welcome" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Welcome Message</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to the {dept.name} department. We are committed to providing excellent education and fostering innovation in our field. Our programs are designed to equip students with the skills and knowledge needed to excel in their careers and contribute to the advancement of technology.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="hod" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Head of Department</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center">
                <dept.icon className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">Prof. B.F Oladejo </h3>
                <p className="text-primary mb-2">Head of Department</p>
                <p className="text-muted-foreground text-sm">Ph.D Computer Science </p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Prof. Bolanle F. Oladejo has the following qualifications; NCE Computer  Science (Maths) 1994; B.Sc.  Computer  Science 1999, M.Sc Computer Science 2003,  Ph.D. Computer Science 2010 (Ibadan), Ph.D Computer Science 2010, (Nancy). Member CPN, NCS                                                  
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Course Offerings - 100 Level</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">First Semester</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses100L.first.map(course => <TableRow key={course.code}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.unit}</TableCell>
                          
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Second Semester</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses100L.second.map(course => <TableRow key={course.code}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.unit}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.status === "Required" ? "bg-primary/10 text-primary" : "bg-accent-gold/10 text-accent-gold"}`}>
                              {course.status}
                            </span>
                          </TableCell>
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Academic Staff</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Specialization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffData.map(staff => <TableRow key={staff.name}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.qualification}</TableCell>
                      <TableCell>{staff.designation}</TableCell>
                      <TableCell>{staff.specialization}</TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p><strong className="text-foreground">Address:</strong> {dept.name}, Faculty of Computing, University of Ibadan</p>
              <p><strong className="text-foreground">Email:</strong> {deptId}@computing.ui.edu.ng</p>
              <p><strong className="text-foreground">Phone:</strong> +234 801 234 5678</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
const Departments = () => {
  const {
    deptId
  } = useParams();
  return <Layout>
      {/* Hero Banner */}
      <section className="relative py-24 lg:py-32 bg-gradient-sky overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              {deptId ? departments.find(d => d.id === deptId)?.name : "Our Departments"}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {deptId ? "Explore our programs, courses, and faculty" : "Four specialized departments driving innovation in computing education"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {deptId ? <DepartmentDetail deptId={deptId} /> : <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((dept, index) => <motion.div key={dept.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                  <Link to={`/departments/${dept.id}`} className="group block">
                    <div className="relative h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow">
                      <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 backdrop-blur flex items-center justify-center">
                            <dept.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="font-display text-xl font-bold text-white group-hover:text-primary-light transition-colors">
                            {dept.shortName}
                          </h3>
                        </div>
                        <p className="text-white/80 text-sm mb-3">{dept.description}</p>
                        <div className="flex items-center gap-2 text-primary-light text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Explore Department</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>)}
            </div>}
        </div>
      </section>
    </Layout>;
};
export default Departments;