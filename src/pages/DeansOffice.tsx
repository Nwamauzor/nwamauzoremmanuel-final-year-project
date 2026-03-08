import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { User, Users, FileText, BookOpen, Linkedin, Twitter, Mail, Download, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import deanPhoto from "@/assets/dean-photo.jpg";
import campusView from "@/assets/campus-view.jpg";
import { useState, useEffect, useRef } from "react";
import { AnimatedCard } from "@/components/animations/DecorativeElements";
import { StaggerContainer, StaggerItem, FadeIn, ScaleIn } from "@/components/animations/PageTransition";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useToast } from "@/hooks/use-toast";

const academicStaff = [
  { name: "Prof. O.F.W Onifade", qualification: "B.Sc., M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Computer Vision, Machine Learning, Information Risk Management" },
  { name: "Prof. B.O. Akinkunmi", qualification: "B.Sc. Computer Science (Ibadan), M.Sc. Physics (Ibadan), PhD Computer Science (Ibadan)", designation: "Professor", specialization: "Knowledge Representation and Formal Ontologies" },
  { name: "Prof. Fausat B. Oladejo", qualification: "B.Sc., M.Sc. Computer Science (Ibadan), PhD Computer Science (Ibadan and Nancy)", designation: "Professor", specialization: "Knowledge Management, AI, Business Intelligence, Software Engineering, NLP" },
  { name: "Dr. Nancy C. Woods", qualification: "B.Sc., M.Sc., PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Image Processing, Pattern Recognition" },
  { name: "Khadijat Ladoja", qualification: "B.Sc. Computer Science (Ilorin), M.Sc., PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Machine Learning, Computer Vision and Robotics" },
  { name: "A.B. Adeyemo", qualification: "B.Sc. Engineering Physics (Ife), PGD, M.Tech., PhD Computer Science (Akure)", designation: "Professor", specialization: "Data Mining, Mobile and Internet Computing" },
  { name: "Adebola K. Ojo", qualification: "B.Sc. Computer Engineering (Ife), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Data/Web Mining, Computer Networks and Hardware" },
  { name: "Aderonke B. Sakpere", qualification: "B.Sc. Computer Science (Ado Ekiti), M.Sc. (Ilorin), PhD (UCT)", designation: "Senior Lecturer", specialization: "Data Privacy, ICT for Development, Human Computer Interaction" },
  { name: "B.I. Ayinla", qualification: "B.Sc. Computer Science (OOU), M.Sc., PhD Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Machine Learning Algorithm, Cybersecurity" },
  { name: "Elizabeth O. Ogunseye", qualification: "B.Sc. Computer Science (Ekpoma), M.Sc. Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Health Informatics, Data Science" },
  { name: "Angela U. Makolo", qualification: "B.Sc. Computer Science (Benin), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Bioinformatics, Software Engineering" },
  { name: "O. Osunade", qualification: "B.Sc. Computer Engineering (Ife), M.Sc. (Ibadan), MBA (Akure), PhD (Ibadan)", designation: "Professor", specialization: "Computer Networks and Data Communications, NLP" },
  { name: "T. Oguntunde", qualification: "B.Sc., M.Sc., PhD Computer Science (Ibadan)", designation: "Senior Lecturer", specialization: "Networking, Collaborative Learning Objects" },
  { name: "O.D. Adeniji", qualification: "B.Eng. Computer Engineering (Minna), M.Sc. (Malaysia), PhD (Ibadan)", designation: "Senior Lecturer", specialization: "Wireless Computing, Network Security and Hardware" },
  { name: "O. Adeleke", qualification: "B.Sc. Computer Science (LASU), M.Sc. (Akure), PhD (Ibadan)", designation: "Lecturer II", specialization: "Data Communications, Networking, Mobile Agents" },
  { name: "O.A. Abiola", qualification: "B.Sc. Computer Science (Ekpoma), M.Sc. Computer Science (Ibadan)", designation: "Lecturer II", specialization: "Software Engineering, Autonomous Robotic Navigation" },
  { name: "S.O. Akinola", qualification: "B.Sc. Computer Science (Ibadan), M.Inf Science (Ibadan), PhD (Ibadan)", designation: "Professor", specialization: "Software Engineering, Data Mining" },
  { name: "Ibiyinka T. Ayorinde", qualification: "B.Tech. Computer Science (Akure), M.Sc., PhD Computer Science (Ibadan)", designation: "Reader", specialization: "Knowledge Representation, Data Mining and Software Engineering" },
  { name: "I.O. Olaleye", qualification: "B.Sc. Computer Science (Iwo), M.Sc. Computer Science (Ibadan)", designation: "Assistant Lecturer", specialization: "Software Engineering, Artificial Intelligence" },
  { name: "S.O. Titiloye", qualification: "B.Sc. Computer Science (Iwo), M.Sc. Computer Science (Ibadan)", designation: "Assistant Lecturer", specialization: "Software Engineering, Artificial Intelligence" },
];

const technicalStaff = [
  { name: "Mr. I.O.I. Akinwale", designation: "Assistant Chief Technologist" },
  { name: "Mr. I.S. Abioye", designation: "Principal Technical Officer" },
];

const adminStaff = [
  { name: "Mr. J.A. Ayoade", designation: "Chief Personal Secretary" },
  { name: "Mr. R.E. Abuya", designation: "High Executive Officer" },
  { name: "Mr. J.O. Omigbire", designation: "High Transport Officer" },
  { name: "Mr. O.A. Daodu", designation: "Supervisor (Office)" },
];

const DeanProfile = () => (
  <StaggerContainer className="space-y-8">
    <StaggerItem>
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <FadeIn direction="left" className="lg:w-1/3">
            <motion.div className="relative rounded-2xl overflow-hidden shadow-elevated" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img src={deanPhoto} alt="Prof. A. B. Adeyemo" className="w-full aspect-[3/4] object-cover" />
              <motion.div className="absolute top-0 right-0 w-20 h-20" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                <div className="w-full h-full bg-gradient-gold opacity-80" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
              </motion.div>
            </motion.div>
            <div className="flex justify-center gap-4 mt-6">
              {[Linkedin, Twitter, Mail].map((Icon, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.1 }} whileHover={{ y: -5, scale: 1.1 }}>
                  <Button variant="outline" size="icon" className="rounded-full"><Icon className="w-5 h-5" /></Button>
                </motion.div>
              ))}
            </div>
          </FadeIn>
          <div className="lg:w-2/3 space-y-4 sm:space-y-6">
            <FadeIn delay={0.2}>
              <div>
                <h2 className="font-display text-xl sm:text-3xl font-bold text-foreground mb-2">Prof. A. B. Adeyemo</h2>
                <motion.p className="text-primary font-medium text-sm sm:text-base" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                  Dean, Faculty of Computing
                </motion.p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base">
                {[
                  { label: "Qualification", value: "B.Sc. Engineering Physics (Ife), PGD, M.Tech., PhD Computer Science (Akure)" },
                  { label: "Specialization", value: "Data Mining, Mobile and Internet Computing" },
                  { label: "Email", value: "ab.adeyemo@ui.edu.ng" },
                ].map((info, index) => (
                  <motion.p key={info.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ x: 5 }}>
                    <strong className="text-foreground">{info.label}:</strong> {info.value}
                  </motion.p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2">Biography</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Prof. A. B. Adeyemo is a distinguished academic with over 25 years of experience in computer science education and research. He obtained his PhD from the Federal University of Technology, Akure, and has held various academic and administrative positions at the University of Ibadan.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-primary hover:bg-primary-dark text-sm"><Download className="w-4 h-4 mr-2" />Download CV</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="text-sm">View Publications</Button>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </StaggerItem>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <AnimatedCard delay={0.2} className="glass-card p-4 sm:p-6 rounded-2xl">
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">Research Interests</h3>
        <ul className="space-y-2 text-muted-foreground text-sm">
          {["Artificial Intelligence and Machine Learning", "Natural Language Processing", "Data Mining and Analytics", "Intelligent Systems"].map((interest, index) => (
            <motion.li key={interest} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1 }} whileHover={{ x: 5, color: "hsl(42 92% 56%)" }} className="cursor-default">• {interest}</motion.li>
          ))}
        </ul>
      </AnimatedCard>
      <AnimatedCard delay={0.3} className="glass-card p-4 sm:p-6 rounded-2xl">
        <h3 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4">Grants & Funding</h3>
        <ul className="space-y-2 text-muted-foreground text-sm">
          {["TETFund Research Grant (2023)", "PTDF Research Fellowship (2021)", "NUC Research Development Grant (2020)", "International AI Research Grant (2019)"].map((grant, index) => (
            <motion.li key={grant} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + index * 0.1 }} whileHover={{ x: 5, color: "hsl(42 92% 56%)" }} className="cursor-default">• {grant}</motion.li>
          ))}
        </ul>
      </AnimatedCard>
    </div>
  </StaggerContainer>
);

const FacultyStaff = () => {
  const renderAcademicStaffTable = (staffList: typeof academicStaff) => (
    <div className="glass-card p-4 sm:p-6 rounded-2xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm">Name</TableHead>
            <TableHead className="text-xs sm:text-sm hidden md:table-cell">Qualification</TableHead>
            <TableHead className="text-xs sm:text-sm">Designation</TableHead>
            <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Specialization</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList.map((staff, index) => (
            <motion.tr key={staff.name} className="border-b transition-colors hover:bg-muted/50" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <TableCell className="font-medium text-xs sm:text-sm">{staff.name}</TableCell>
              <TableCell className="text-xs sm:text-sm hidden md:table-cell">{staff.qualification}</TableCell>
              <TableCell className="text-xs sm:text-sm">{staff.designation}</TableCell>
              <TableCell className="text-xs sm:text-sm hidden lg:table-cell">{staff.specialization}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderSimpleStaffTable = (staffList: typeof technicalStaff) => (
    <div className="glass-card p-4 sm:p-6 rounded-2xl overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm">Name</TableHead>
            <TableHead className="text-xs sm:text-sm">Designation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffList.map((staff, index) => (
            <motion.tr key={staff.name} className="border-b transition-colors hover:bg-muted/50" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <TableCell className="font-medium text-xs sm:text-sm">{staff.name}</TableCell>
              <TableCell className="text-xs sm:text-sm">{staff.designation}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <FadeIn>
      <Tabs defaultValue="academic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted">
          <TabsTrigger value="academic" className="py-2 text-xs sm:text-sm">Academic</TabsTrigger>
          <TabsTrigger value="technical" className="py-2 text-xs sm:text-sm">Technical</TabsTrigger>
          <TabsTrigger value="admin" className="py-2 text-xs sm:text-sm">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="academic" className="mt-4 sm:mt-6">{renderAcademicStaffTable(academicStaff)}</TabsContent>
        <TabsContent value="technical" className="mt-4 sm:mt-6">{renderSimpleStaffTable(technicalStaff)}</TabsContent>
        <TabsContent value="admin" className="mt-4 sm:mt-6">{renderSimpleStaffTable(adminStaff)}</TabsContent>
      </Tabs>
    </FadeIn>
  );
};

const Journals = () => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [country, setCountry] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [journals, setJournals] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    loadJournals();
    return () => subscription.unsubscribe();
  }, []);

  const loadJournals = async () => {
    const { data } = await supabase.from("journals").select("*").order("created_at", { ascending: false });
    if (data) setJournals(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast({ title: "Login failed", description: error.message, variant: "destructive" });
    else toast({ title: "Welcome back!" });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { given_name: givenName, family_name: familyName } },
    });
    if (error) toast({ title: "Registration failed", description: error.message, variant: "destructive" });
    else toast({ title: "Account created!", description: "You are now logged in." });
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (error) toast({ title: "Error", description: String(error), variant: "destructive" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !uploadTitle) return;

    setUploading(true);
    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("journals").upload(filePath, file);

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("journals").getPublicUrl(filePath);

    await supabase.from("journals").insert({
      user_id: user.id, title: uploadTitle, description: uploadDesc,
      file_url: publicUrl, file_name: file.name, file_type: file.type,
    });

    toast({ title: "Journal uploaded!" });
    setUploadTitle("");
    setUploadDesc("");
    setUploading(false);
    loadJournals();
  };

  return (
    <ScaleIn className="max-w-2xl mx-auto">
      <div className="glass-card p-4 sm:p-8 rounded-2xl">
        <Tabs defaultValue="current" className="mb-6 sm:mb-8">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
            <TabsTrigger value="current" className="py-2 text-xs sm:text-sm">Current Issues</TabsTrigger>
            <TabsTrigger value="archives" className="py-2 text-xs sm:text-sm">Archives</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-4 sm:mt-6">
            <div className="space-y-3 sm:space-y-4">
              {journals.length > 0 ? journals.slice(0, 5).map((journal) => (
                <motion.div key={journal.id} className="p-3 sm:p-4 bg-muted rounded-lg" whileHover={{ scale: 1.02 }}>
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">{journal.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{journal.description || journal.file_name}</p>
                    </div>
                    {journal.file_url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={journal.file_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-4 h-4 mr-1" />View
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              )) : (
                <>
                  {[
                    { title: "Vol. 5, Issue 2 (2024)", subtitle: "Journal of Computing Research" },
                    { title: "Vol. 5, Issue 1 (2024)", subtitle: "Journal of Computing Research" },
                  ].map((journal) => (
                    <motion.div key={journal.title} className="p-3 sm:p-4 bg-muted rounded-lg" whileHover={{ scale: 1.02 }}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{journal.title}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{journal.subtitle}</p>
                        </div>
                        <Button size="sm" variant="outline"><FileText className="w-4 h-4 mr-1" />View</Button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="archives" className="mt-4 sm:mt-6">
            <div className="space-y-3 sm:space-y-4">
              {[2023, 2022, 2021, 2020].map((year) => (
                <motion.div key={year} className="p-3 sm:p-4 bg-muted rounded-lg" whileHover={{ scale: 1.02 }}>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base mb-2">{year} Issues</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">4 issues available</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div className="border-t border-border pt-6 sm:pt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {user ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">Upload Journal</h3>
                <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4 mr-1" />Logout</Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="uploadTitle" className="text-sm">Title</Label>
                  <Input id="uploadTitle" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} placeholder="Journal title" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="uploadDesc" className="text-sm">Description (optional)</Label>
                  <Input id="uploadDesc" value={uploadDesc} onChange={(e) => setUploadDesc(e.target.value)} placeholder="Brief description" className="mt-1" />
                </div>
                <div>
                  <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" className="hidden" onChange={handleFileUpload} />
                  <Button onClick={() => fileInputRef.current?.click()} disabled={uploading || !uploadTitle} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />{uploading ? "Uploading..." : "Choose & Upload File"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX</p>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6 text-center">
                {isLogin ? "Login to Upload Journal" : "Register to Submit Articles"}
              </h3>

              {isLogin ? (
                <motion.form className="space-y-3 sm:space-y-4" onSubmit={handleLogin} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div>
                    <Label htmlFor="username" className="text-sm">Email</Label>
                    <Input id="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="mt-1" required />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" checked={keepLoggedIn} onCheckedChange={(v) => setKeepLoggedIn(!!v)} />
                    <Label htmlFor="remember" className="text-sm">Keep me logged in</Label>
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                  <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button type="button" onClick={() => setIsLogin(false)} className="text-primary hover:underline">Register here</button>
                  </p>
                </motion.form>
              ) : (
                <motion.form className="space-y-3 sm:space-y-4" onSubmit={handleRegister} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="givenName" className="text-sm">Given Name</Label>
                      <Input id="givenName" value={givenName} onChange={(e) => setGivenName(e.target.value)} placeholder="First name" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="familyName" className="text-sm">Family Name</Label>
                      <Input id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="Last name" className="mt-1" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="affiliation" className="text-sm">Affiliation</Label>
                    <Input id="affiliation" value={affiliation} onChange={(e) => setAffiliation(e.target.value)} placeholder="University/Organization" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm">Country</Label>
                    <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="regEmail" className="text-sm">Email</Label>
                    <Input id="regEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="regPassword" className="text-sm">Password</Label>
                    <Input id="regPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" className="mt-1" required />
                  </div>
                  <Button type="submit" className="w-full">Register</Button>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-primary hover:underline">Login here</button>
                  </p>
                </motion.form>
              )}
            </>
          )}
        </motion.div>
      </div>
    </ScaleIn>
  );
};

const subpages = [
  { id: "dean", label: "Dean's Profile", icon: User },
  { id: "staff", label: "Faculty Staff", icon: Users },
  { id: "journals", label: "Journals", icon: BookOpen },
];

const DeansOffice = () => {
  const { subpage } = useParams();
  const currentSubpage = subpage || "dean";

  const renderContent = () => {
    switch (currentSubpage) {
      case "dean": return <DeanProfile />;
      case "staff": return <FacultyStaff />;
      case "journals": return <Journals />;
      default: return <DeanProfile />;
    }
  };

  return (
    <Layout>
      <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusView} alt="Faculty of Computing Campus" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/70 to-secondary/90" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              Dean's Office
            </motion.h1>
            <motion.p className="text-sm sm:text-lg text-white/90 max-w-2xl mx-auto px-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Meet our leadership team and explore faculty resources
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border bg-card sticky top-20 z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {subpages.map((page, index) => (
              <motion.div key={page.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Link
                  to={`/deans-office/${page.id}`}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    currentSubpage === page.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
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

      <section className="py-8 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <BackButton />
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default DeansOffice;
