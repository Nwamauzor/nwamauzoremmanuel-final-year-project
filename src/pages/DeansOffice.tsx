import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { User, Users, FileText, BookOpen, Linkedin, Twitter, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import deanPhoto from "@/assets/dean-photo.jpg";
import { useState } from "react";

const academicStaff = [
  { name: "Prof. A. B. Adeyemo", qualification: "Ph.D Computer Science", designation: "Professor/Dean", specialization: "AI & Machine Learning" },
  { name: "Dr. C. D. Ogunleye", qualification: "Ph.D Data Science", designation: "Professor", specialization: "Data Analytics" },
  { name: "Dr. E. F. Akinola", qualification: "Ph.D Software Engineering", designation: "Senior Lecturer", specialization: "Software Architecture" },
  { name: "Dr. G. H. Ibrahim", qualification: "Ph.D Information Systems", designation: "Lecturer I", specialization: "Information Security" },
];

const technicalStaff = [
  { name: "Mr. I. J. Okafor", qualification: "M.Sc Computer Science", designation: "Chief Technologist", specialization: "Lab Management" },
  { name: "Mrs. K. L. Adamu", qualification: "B.Sc Computer Science", designation: "Senior Technologist", specialization: "Network Administration" },
  { name: "Mr. M. N. Olawale", qualification: "HND Computer Science", designation: "Technologist I", specialization: "Hardware Maintenance" },
];

const adminStaff = [
  { name: "Mrs. O. P. Bakare", qualification: "B.A Public Administration", designation: "Administrative Officer", specialization: "Office Management" },
  { name: "Mr. Q. R. Sanni", qualification: "B.Sc Accounting", designation: "Accountant II", specialization: "Financial Records" },
  { name: "Ms. S. T. Uche", qualification: "OND Secretarial Studies", designation: "Secretary", specialization: "Correspondence" },
];

const DeanProfile = () => (
  <div className="space-y-8">
    <div className="glass-card p-8 rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated">
            <img
              src={deanPhoto}
              alt="Prof. A. B. Adeyemo"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Mail className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="lg:w-2/3 space-y-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">Prof. A. B. Adeyemo</h2>
            <p className="text-primary font-medium">Dean, Faculty of Computing</p>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <p><strong className="text-foreground">Qualification:</strong> Ph.D Computer Science (University of Manchester, UK)</p>
            <p><strong className="text-foreground">Specialization:</strong> Artificial Intelligence, Machine Learning, Data Science</p>
            <p><strong className="text-foreground">Email:</strong> ab.adeyemo@ui.edu.ng</p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Biography</h3>
            <p className="text-muted-foreground leading-relaxed">
              Prof. A. B. Adeyemo is a distinguished academic with over 25 years of experience in computer science education and research. He obtained his Ph.D from the University of Manchester, UK, and has held various academic and administrative positions at the University of Ibadan.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary-dark">
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button variant="outline">View Publications</Button>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Research Interests</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Artificial Intelligence and Machine Learning</li>
          <li>• Natural Language Processing</li>
          <li>• Data Mining and Analytics</li>
          <li>• Intelligent Systems</li>
        </ul>
      </div>
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Grants & Funding</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• TETFund Research Grant (2023)</li>
          <li>• PTDF Research Fellowship (2021)</li>
          <li>• NUC Research Development Grant (2020)</li>
          <li>• International AI Research Grant (2019)</li>
        </ul>
      </div>
    </div>
  </div>
);

const FacultyStaff = () => (
  <Tabs defaultValue="academic" className="w-full">
    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted">
      <TabsTrigger value="academic" className="py-2">Academic Staff</TabsTrigger>
      <TabsTrigger value="technical" className="py-2">Technical Staff</TabsTrigger>
      <TabsTrigger value="admin" className="py-2">Administrative Staff</TabsTrigger>
    </TabsList>

    <TabsContent value="academic" className="mt-6">
      <div className="glass-card p-6 rounded-2xl overflow-x-auto">
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
            {academicStaff.map((staff) => (
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
    </TabsContent>

    <TabsContent value="technical" className="mt-6">
      <div className="glass-card p-6 rounded-2xl overflow-x-auto">
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
            {technicalStaff.map((staff) => (
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
    </TabsContent>

    <TabsContent value="admin" className="mt-6">
      <div className="glass-card p-6 rounded-2xl overflow-x-auto">
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
            {adminStaff.map((staff) => (
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
    </TabsContent>
  </Tabs>
);

const Journals = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <Tabs defaultValue="current" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
            <TabsTrigger value="current" className="py-2">Current Issues</TabsTrigger>
            <TabsTrigger value="archives" className="py-2">Archives</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Vol. 5, Issue 2 (2024)</h4>
                    <p className="text-sm text-muted-foreground">Journal of Computing Research</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Vol. 5, Issue 1 (2024)</h4>
                    <p className="text-sm text-muted-foreground">Journal of Computing Research</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="archives" className="mt-6">
            <div className="space-y-4">
              {[2023, 2022, 2021, 2020].map((year) => (
                <div key={year} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">{year} Issues</h4>
                  <p className="text-sm text-muted-foreground">4 issues available</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t border-border pt-8">
          <h3 className="font-display text-xl font-bold text-foreground mb-6 text-center">
            {isLogin ? "Login to Upload Journal" : "Register to Submit Articles"}
          </h3>

          {isLogin ? (
            <form className="space-y-4">
              <div>
                <Label htmlFor="username">Username or Email</Label>
                <Input id="username" type="text" placeholder="Enter username or email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter password" className="mt-1" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Keep me logged in</Label>
                </div>
                <Button variant="link" className="text-sm p-0">Forgot password?</Button>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-dark">Login</Button>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button type="button" onClick={() => setIsLogin(false)} className="text-primary hover:underline">
                  Register here
                </button>
              </p>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="givenName">Given Name</Label>
                  <Input id="givenName" type="text" placeholder="First name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="familyName">Family Name</Label>
                  <Input id="familyName" type="text" placeholder="Last name" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input id="affiliation" type="text" placeholder="University/Organization" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" type="text" placeholder="Country" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email address" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="regUsername">Username</Label>
                <Input id="regUsername" type="text" placeholder="Choose a username" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="regPassword">Password</Label>
                <Input id="regPassword" type="password" placeholder="Create password" className="mt-1" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary-dark">Register</Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button type="button" onClick={() => setIsLogin(true)} className="text-primary hover:underline">
                  Login here
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const subpages = [
  { id: "dean", label: "Dean's Profile", icon: User },
  { id: "faculty-officer", label: "Faculty Officer", icon: User },
  { id: "staff", label: "Faculty Staff", icon: Users },
  { id: "journals", label: "Journals", icon: BookOpen },
];

const DeansOffice = () => {
  const { subpage } = useParams();
  const currentSubpage = subpage || "dean";

  const renderContent = () => {
    switch (currentSubpage) {
      case "dean":
      case "faculty-officer":
        return <DeanProfile />;
      case "staff":
        return <FacultyStaff />;
      case "journals":
        return <Journals />;
      default:
        return <DeanProfile />;
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
              Dean's Office
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Meet our leadership team and explore faculty resources
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
                to={`/deans-office/${page.id}`}
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

export default DeansOffice;
