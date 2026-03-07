import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchableContent, SearchResult } from "@/data/searchableContent";
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
        item.category.toLowerCase().includes(searchQuery) ||
        item.keywords.some(kw => kw.toLowerCase().includes(searchQuery))
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