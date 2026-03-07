import { FileText, Users, Building, GraduationCap, BookOpen, Shield, Calendar, ClipboardCheck } from "lucide-react";

export interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
  icon: typeof FileText;
  keywords: string[];
}

export const searchableContent: SearchResult[] = [
  // Main pages
  { title: "Home", description: "Faculty of Computing homepage", path: "/", category: "Pages", icon: FileText, keywords: ["home", "faculty", "computing", "university", "ibadan", "welcome"] },
  { title: "History", description: "History of Computing at University of Ibadan", path: "/history", category: "Pages", icon: BookOpen, keywords: ["history", "established", "founding", "computing", "faculty", "university of ibadan"] },
  { title: "Departments", description: "All departments overview", path: "/departments", category: "Pages", icon: Building, keywords: ["departments", "programs", "courses", "academic"] },
  { title: "Dean's Office", description: "Dean's office information", path: "/deans-office", category: "Pages", icon: Users, keywords: ["dean", "office", "administration", "leadership"] },
  { title: "Students", description: "Student information and resources", path: "/students", category: "Pages", icon: GraduationCap, keywords: ["students", "admission", "registration", "grading"] },
  { title: "Alumni", description: "Alumni network and resources", path: "/alumni", category: "Pages", icon: Users, keywords: ["alumni", "graduates", "network"] },

  // Departments
  { title: "Computer Science & AI", description: "Department of Computer Science and Artificial Intelligence", path: "/departments/cs-ai", category: "Departments", icon: Building, keywords: ["computer science", "artificial intelligence", "AI", "machine learning", "algorithms", "programming", "data structures"] },
  { title: "Data Science", description: "Department of Data Science", path: "/departments/data-science", category: "Departments", icon: Building, keywords: ["data science", "analytics", "statistics", "big data", "data mining", "visualization"] },
  { title: "ICT", description: "Department of Information & Communication Technology", path: "/departments/ict", category: "Departments", icon: Building, keywords: ["ICT", "information technology", "communication", "networking", "systems", "infrastructure"] },
  { title: "Software Engineering", description: "Department of Software Engineering", path: "/departments/software", category: "Departments", icon: Building, keywords: ["software engineering", "development", "testing", "project management", "agile", "software design"] },

  // Dean's Office subpages
  { title: "Dean's Profile", description: "Prof. A. B. Adeyemo – Dean of Faculty of Computing", path: "/deans-office/dean", category: "Dean's Office", icon: Users, keywords: ["dean", "adeyemo", "profile", "PhD", "akure", "data mining", "mobile computing", "internet computing", "engineering physics"] },
  { title: "Faculty Staff", description: "All faculty staff directory", path: "/deans-office/staff", category: "Dean's Office", icon: Users, keywords: ["staff", "faculty", "lecturers", "professors", "directory", "academic staff"] },
  { title: "Journals", description: "Faculty journals and publications", path: "/deans-office/journals", category: "Dean's Office", icon: BookOpen, keywords: ["journals", "publications", "research", "papers", "academic", "peer review"] },

  // Student subpages
  { title: "Admission", description: "Admission requirements and process", path: "/students/admission", category: "Students", icon: GraduationCap, keywords: ["admission", "requirements", "UTME", "JAMB", "post-UTME", "cut-off", "apply", "undergraduate", "postgraduate", "M.Sc", "Ph.D", "O-Level", "credits", "mathematics", "english"] },
  { title: "Activities", description: "Student activities, timetable and sessional calendar", path: "/students/activities", category: "Students", icon: Calendar, keywords: ["activities", "timetable", "lectures", "calendar", "events", "semester", "resumption", "examinations"] },
  { title: "Registration", description: "Course registration information", path: "/students/registration", category: "Students", icon: ClipboardCheck, keywords: ["registration", "course registration", "student portal", "fee payment", "enrolment"] },
  { title: "Grading", description: "Grading system and degree classification", path: "/students/grading", category: "Students", icon: BookOpen, keywords: ["grading", "GPA", "CGPA", "grade point", "first class", "second class", "third class", "pass", "degree classification", "A", "B", "C", "D", "E", "F"] },
  { title: "Conduct & Discipline", description: "Student general conducts and discipline rules", path: "/students/conduct", category: "Students", icon: Shield, keywords: ["conduct", "discipline", "misconduct", "examination", "unruly", "vandalism", "dressing", "insubordination", "criminal", "offences", "disciplinary committee", "sanctions", "rules", "regulations", "burglary", "assault", "fraud", "theft", "cult", "arson", "rape", "drugs"] },

  // Staff
  { title: "Prof. A. B. Adeyemo", description: "Dean – B.Sc. Engineering Physics (Ife), PGD, M.Tech., PhD Computer Science (Akure)", path: "/deans-office/dean", category: "Staff", icon: Users, keywords: ["adeyemo", "dean", "data mining", "mobile computing", "internet computing"] },
  { title: "Dr. Adebola K. Ojo", description: "HOD Data Science", path: "/departments/data-science", category: "Staff", icon: Users, keywords: ["ojo", "adebola", "data science", "HOD"] },
  { title: "Prof. O. Osunade", description: "HOD ICT", path: "/departments/ict", category: "Staff", icon: Users, keywords: ["osunade", "ICT", "HOD"] },
  { title: "Dr. Ibiyinka T. Ayorinde", description: "HOD Software Engineering", path: "/departments/software", category: "Staff", icon: Users, keywords: ["ayorinde", "ibiyinka", "software engineering", "HOD"] },

  // Academic keywords
  { title: "Courses", description: "View course offerings for all departments", path: "/departments", category: "Academic", icon: BookOpen, keywords: ["courses", "modules", "subjects", "curriculum", "syllabus"] },
  { title: "SIWES", description: "Student Industrial Work Experience Scheme", path: "/students", category: "Academic", icon: GraduationCap, keywords: ["SIWES", "industrial training", "internship", "work experience", "placement"] },
  { title: "Examinations", description: "Information about examinations", path: "/students/grading", category: "Academic", icon: BookOpen, keywords: ["examinations", "exams", "tests", "CA", "continuous assessment", "semester exams"] },
  { title: "Research", description: "Faculty research and publications", path: "/deans-office/journals", category: "Academic", icon: BookOpen, keywords: ["research", "publications", "papers", "thesis", "dissertation", "academic writing"] },
  { title: "Student Portal", description: "Access the University student portal for registration", path: "/students/registration", category: "Resources", icon: GraduationCap, keywords: ["portal", "student portal", "online", "registration portal"] },
  { title: "Lecture Timetable", description: "View the lecture timetable and schedule", path: "/students/activities", category: "Academic", icon: Calendar, keywords: ["timetable", "schedule", "lectures", "classes", "time", "venue"] },
  { title: "Degree Classification", description: "CGPA ranges and degree class information", path: "/students/grading", category: "Academic", icon: BookOpen, keywords: ["first class", "second class upper", "second class lower", "third class", "CGPA", "classification", "degree"] },
];
