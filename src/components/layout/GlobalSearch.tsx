 import { useState, useEffect, useRef } from "react";
 import { useNavigate } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Search, X, FileText, Users, Building, GraduationCap, BookOpen } from "lucide-react";
 import { Input } from "@/components/ui/input";
 
 interface SearchResult {
   title: string;
   description: string;
   path: string;
   category: string;
   icon: typeof FileText;
 }
 
 const searchableContent: SearchResult[] = [
   // Main pages
   { title: "Home", description: "Faculty of Computing homepage", path: "/", category: "Pages", icon: FileText },
   { title: "History", description: "History of Computing at UI", path: "/history", category: "Pages", icon: BookOpen },
   { title: "Departments", description: "All departments overview", path: "/departments", category: "Pages", icon: Building },
   { title: "Dean's Office", description: "Dean's office information", path: "/deans-office", category: "Pages", icon: Users },
   { title: "Students", description: "Student information and resources", path: "/students", category: "Pages", icon: GraduationCap },
   { title: "Alumni", description: "Alumni network and resources", path: "/alumni", category: "Pages", icon: Users },
   
   // Departments
   { title: "Computer Science & AI", description: "Department of Computer Science and Artificial Intelligence", path: "/departments/cs-ai", category: "Departments", icon: Building },
   { title: "Data Science", description: "Department of Data Science", path: "/departments/data-science", category: "Departments", icon: Building },
   { title: "ICT", description: "Department of Information & Communication Technology", path: "/departments/ict", category: "Departments", icon: Building },
   { title: "Software Engineering", description: "Department of Software Engineering", path: "/departments/software", category: "Departments", icon: Building },
   
   // Dean's Office subpages
   { title: "Dean's Profile", description: "Profile of the Dean", path: "/deans-office/dean", category: "Dean's Office", icon: Users },
   { title: "Faculty Officer", description: "Faculty Officer information", path: "/deans-office/faculty-officer", category: "Dean's Office", icon: Users },
   { title: "Faculty Staff", description: "All faculty staff directory", path: "/deans-office/staff", category: "Dean's Office", icon: Users },
   { title: "Journals", description: "Faculty journals and publications", path: "/deans-office/journals", category: "Dean's Office", icon: BookOpen },
   
   // Student subpages
   { title: "Admission", description: "Admission requirements and process", path: "/students/admission", category: "Students", icon: GraduationCap },
   { title: "Activities", description: "Student activities and events", path: "/students/activities", category: "Students", icon: GraduationCap },
   { title: "Registration", description: "Course registration information", path: "/students/registration", category: "Students", icon: GraduationCap },
   { title: "Grading", description: "Grading of courses", path: "/students/grading", category: "Students", icon: GraduationCap },
   { title: "Conduct & Discipline", description: "Student conduct and discipline", path: "/students/conduct", category: "Students", icon: GraduationCap },
   
   // Keywords
   { title: "Courses", description: "View course offerings for all departments", path: "/departments", category: "Academic", icon: BookOpen },
   { title: "SIWES", description: "Student Industrial Work Experience Scheme", path: "/students", category: "Academic", icon: GraduationCap },
   { title: "HOD", description: "Head of Department profiles", path: "/departments", category: "Staff", icon: Users },
   { title: "Prof. A. B. Adeyemo", description: "Dean of Faculty of Computing", path: "/deans-office/dean", category: "Staff", icon: Users },
   { title: "Dr. Adebola K. Ojo", description: "HOD Data Science", path: "/departments/data-science", category: "Staff", icon: Users },
   { title: "Prof. O. Osunade", description: "HOD ICT", path: "/departments/ict", category: "Staff", icon: Users },
   { title: "Dr. Ibiyinka T. Ayorinde", description: "HOD Software Engineering", path: "/departments/software", category: "Staff", icon: Users },
 ];
 
 interface GlobalSearchProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
   const [query, setQuery] = useState("");
   const [results, setResults] = useState<SearchResult[]>([]);
   const inputRef = useRef<HTMLInputElement>(null);
   const navigate = useNavigate();
 
   useEffect(() => {
     if (isOpen && inputRef.current) {
       inputRef.current.focus();
     }
   }, [isOpen]);
 
   useEffect(() => {
     if (query.trim() === "") {
       setResults([]);
       return;
     }
 
     const searchQuery = query.toLowerCase();
     const filtered = searchableContent.filter(
       item =>
         item.title.toLowerCase().includes(searchQuery) ||
         item.description.toLowerCase().includes(searchQuery) ||
         item.category.toLowerCase().includes(searchQuery)
     );
     setResults(filtered);
   }, [query]);
 
   const handleSelect = (path: string) => {
     navigate(path);
     setQuery("");
     onClose();
   };
 
   const handleKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === "Escape") {
       onClose();
     }
   };
 
   return (
     <AnimatePresence>
       {isOpen && (
         <>
           {/* Backdrop */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
             onClick={onClose}
           />
           
           {/* Search Modal */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: -20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: -20 }}
             transition={{ duration: 0.2 }}
             className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
           >
             <div className="bg-card border border-border rounded-2xl shadow-elevated overflow-hidden">
               {/* Search Input */}
               <div className="flex items-center gap-3 p-4 border-b border-border">
                 <Search className="w-5 h-5 text-muted-foreground" />
                 <Input
                   ref={inputRef}
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                   onKeyDown={handleKeyDown}
                   placeholder="Search pages, departments, staff..."
                   className="flex-1 border-0 focus-visible:ring-0 text-lg bg-transparent"
                 />
                 <button
                   onClick={onClose}
                   className="p-1 rounded-lg hover:bg-muted transition-colors"
                 >
                   <X className="w-5 h-5 text-muted-foreground" />
                 </button>
               </div>
 
               {/* Results */}
               <div className="max-h-[60vh] overflow-y-auto">
                 {query.trim() !== "" && results.length === 0 && (
                   <div className="p-8 text-center">
                     <p className="text-muted-foreground">No results found for "{query}"</p>
                     <p className="text-sm text-muted-foreground mt-2">Try searching for departments, courses, or staff names</p>
                   </div>
                 )}
 
                 {results.length > 0 && (
                   <div className="p-2">
                     {results.map((result, index) => (
                       <motion.button
                         key={result.path + index}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: index * 0.05 }}
                         onClick={() => handleSelect(result.path)}
                         className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                       >
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                           <result.icon className="w-5 h-5" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                             {result.title}
                           </p>
                           <p className="text-sm text-muted-foreground truncate">
                             {result.description}
                           </p>
                         </div>
                         <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                           {result.category}
                         </span>
                       </motion.button>
                     ))}
                   </div>
                 )}
 
                 {query.trim() === "" && (
                   <div className="p-4">
                     <p className="text-sm text-muted-foreground mb-3">Quick Links</p>
                     <div className="flex flex-wrap gap-2">
                       {["Departments", "Courses", "Admission", "Staff", "Journals"].map((item) => (
                         <button
                           key={item}
                           onClick={() => setQuery(item)}
                           className="px-3 py-1.5 text-sm rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                         >
                           {item}
                         </button>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             </div>
           </motion.div>
         </>
       )}
     </AnimatePresence>
   );
 };
 
 export default GlobalSearch;