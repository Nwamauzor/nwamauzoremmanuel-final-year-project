import { useParams } from "react-router-dom";
import AiPageSummary from "@/components/ai/AiPageSummary";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Database, Wifi, Code } from "lucide-react";
import BackButton from "@/components/layout/BackButton";
import deptCsAi from "@/assets/dept-cs-ai.jpg";
import deptDataScience from "@/assets/dept-data-science.jpg";
import deptIct from "@/assets/dept-ict.jpg";
import deptSoftware from "@/assets/dept-software.jpg";
import campusBuildings from "@/assets/campus-buildings.jpg";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import hodPhoto from "@/assets/hod-photo.jpg";
import hodDataScience from "@/assets/hod-data-science.jpg";
import hodIct from "@/assets/hod-ict.jpg";
import hodSoftware from "@/assets/hod-software.jpg";
import { departmentDataMap } from "@/data/departmentData";
import { useState } from "react";

const departments = [{
  id: "cs-ai",
  name: "Computer Science & Artificial Intelligence",
  shortName: "CS & AI",
  icon: Cpu,
  image: deptCsAi,
  hodImage: hodPhoto,
  description: "Pioneering research and education in computing and machine intelligence",
  color: "from-blue-500 to-cyan-400"
}, {
  id: "data-science",
  name: "Department of Data Science",
  shortName: "Data Science",
  icon: Database,
  image: deptDataScience,
  hodImage: hodDataScience,
  description: "Transforming data into actionable insights and knowledge",
  color: "from-purple-500 to-blue-400"
}, {
  id: "ict",
  name: "Information & Communication Technology",
  shortName: "ICT",
  icon: Wifi,
  image: deptIct,
  hodImage: hodIct,
  description: "Connecting the world through innovative technology solutions",
  color: "from-teal-500 to-green-400"
}, {
  id: "software",
  name: "Department of Software Engineering",
  shortName: "Software Eng",
  icon: Code,
  image: deptSoftware,
  hodImage: hodSoftware,
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
    <div className="space-y-8 sm:space-y-12">
      {/* Back Button */}
      <BackButton />

      {/* AI Summary */}
      <AiPageSummary
        pageName={dept.name}
        pagePath={`/departments/${deptId}`}
        pageContext={`${dept.description}. Offers courses from 100L to 500L.`}
      />

      {/* Department Hero */}
      <section className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
        <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
              <dept.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {dept.name}
              </h1>
              <p className="text-white/80 text-sm sm:text-base">{dept.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-2 h-auto p-1 bg-muted">
          <TabsTrigger value="history" className="py-2 text-xs sm:text-sm">History</TabsTrigger>
          <TabsTrigger value="welcome" className="py-2 text-xs sm:text-sm">Welcome</TabsTrigger>
          <TabsTrigger value="hod" className="py-2 text-xs sm:text-sm">HOD Profile</TabsTrigger>
          <TabsTrigger value="courses" className="py-2 text-xs sm:text-sm">Courses</TabsTrigger>
          <TabsTrigger value="staff" className="py-2 text-xs sm:text-sm">Staff</TabsTrigger>
          <TabsTrigger value="contact" className="py-2 text-xs sm:text-sm">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Department History</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {deptData.history}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="welcome" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Welcome Message</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {deptData.welcomeMessage}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="hod" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Head of Department</h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <img 
                src={dept.hodImage} 
                alt={deptData.hodName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover mx-auto sm:mx-0"
                loading="lazy"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">{deptData.hodName}</h3>
                <p className="text-primary mb-2 text-sm sm:text-base">Head of Department</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{deptData.hodQualification}</p>
                <p className="text-muted-foreground mt-4 leading-relaxed text-sm sm:text-base">
                  {deptData.hodBio}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Course Offerings</h2>
            
            {/* Level Selector */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm ${
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">First Semester</h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">Course Code</TableHead>
                          <TableHead className="text-xs sm:text-sm">Title</TableHead>
                          <TableHead className="text-xs sm:text-sm">Unit</TableHead>
                          <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCourses.first.map(course => (
                          <TableRow key={course.code}>
                            <TableCell className="font-medium text-xs sm:text-sm">{course.code}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.title}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.unit}</TableCell>
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

              <div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">Second Semester</h3>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs sm:text-sm">Course Code</TableHead>
                          <TableHead className="text-xs sm:text-sm">Title</TableHead>
                          <TableHead className="text-xs sm:text-sm">Unit</TableHead>
                          <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCourses.second.map(course => (
                          <TableRow key={course.code}>
                            <TableCell className="font-medium text-xs sm:text-sm">{course.code}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.title}</TableCell>
                            <TableCell className="text-xs sm:text-sm">{course.unit}</TableCell>
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
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Academic Staff</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[700px] sm:min-w-0 px-4 sm:px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Name</TableHead>
                      <TableHead className="text-xs sm:text-sm">Qualification</TableHead>
                      <TableHead className="text-xs sm:text-sm">Designation</TableHead>
                      <TableHead className="text-xs sm:text-sm">Specialization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deptData.staff.map(staff => (
                      <TableRow key={staff.name}>
                        <TableCell className="font-medium text-xs sm:text-sm">{staff.name}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{staff.qualification}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{staff.designation}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{staff.specialization}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-4 sm:mt-6">
          <div className="glass-card p-4 sm:p-8 rounded-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base">
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
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={campusBuildings} 
            alt="Faculty Campus" 
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
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {deptId ? departments.find(d => d.id === deptId)?.name : "Our Departments"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto px-4">
              {deptId ? "Explore our programs, courses, and faculty" : "Four specialized departments driving innovation in computing education"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {deptId ? (
            <DepartmentDetail deptId={deptId} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {departments.map((dept, index) => (
                <motion.div 
                  key={dept.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/departments/${dept.id}`} className="group block">
                    <div className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow">
                      <img src={dept.image} alt={dept.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/20 backdrop-blur flex items-center justify-center">
                            <dept.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-primary-light transition-colors">
                            {dept.shortName}
                          </h3>
                        </div>
                        <p className="text-white/80 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{dept.description}</p>
                        <div className="flex items-center gap-2 text-primary-light text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>Explore Department</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
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
