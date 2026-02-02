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
import hodPhoto from "@/assets/hod-photo.jpg";
import { departmentDataMap, type DepartmentData } from "@/data/departmentData";
import { useState } from "react";

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

const levels = ["100L", "200L", "300L", "400L", "500L"] as const;

const DepartmentDetail = ({
  deptId
}: {
  deptId: string;
}) => {
  const dept = departments.find(d => d.id === deptId);
  const deptData = departmentDataMap[deptId];
  const [selectedLevel, setSelectedLevel] = useState<typeof levels[number]>("100L");
  
  if (!dept || !deptData) return null;

  const currentCourses = deptData.courses[selectedLevel];

  return (
    <div className="space-y-12">
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
              {deptData.history}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="welcome" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Welcome Message</h2>
            <p className="text-muted-foreground leading-relaxed">
              {deptData.welcomeMessage}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="hod" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Head of Department</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <img 
                src={hodPhoto} 
                alt={deptData.hodName}
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{deptData.hodName}</h3>
                <p className="text-primary mb-2">Head of Department</p>
                <p className="text-muted-foreground text-sm">{deptData.hodQualification}</p>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {deptData.hodBio}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Course Offerings</h2>
            
            {/* Level Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            
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
                      {currentCourses.first.map(course => (
                        <TableRow key={course.code}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.unit}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === "Required" 
                                ? "bg-primary/10 text-primary" 
                                : course.status === "Elective"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-accent-gold/10 text-accent-gold"
                            }`}>
                              {course.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
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
                      {currentCourses.second.map(course => (
                        <TableRow key={course.code}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.unit}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === "Required" 
                                ? "bg-primary/10 text-primary" 
                                : course.status === "Elective"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-accent-gold/10 text-accent-gold"
                            }`}>
                              {course.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
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
                  {deptData.staff.map(staff => (
                    <TableRow key={staff.name}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.qualification}</TableCell>
                      <TableCell>{staff.designation}</TableCell>
                      <TableCell>{staff.specialization}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p><strong className="text-foreground">Address:</strong> {deptData.contact.address}</p>
              <p><strong className="text-foreground">Email:</strong> {deptData.contact.email}</p>
              <p><strong className="text-foreground">Phone:</strong> {deptData.contact.phone}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Departments = () => {
  const { deptId } = useParams();
  
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
          {deptId ? (
            <DepartmentDetail deptId={deptId} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {departments.map((dept, index) => (
                <motion.div 
                  key={dept.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                >
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Departments;
