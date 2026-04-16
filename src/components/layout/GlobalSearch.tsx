import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchableContent, SearchResult } from "@/data/searchableContent";
import { useSmartSearch } from "@/hooks/use-ai-assistant";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons: Record<string, string> = {
  Pages: "📄", Departments: "🏛️", "Dean's Office": "👨‍💼", Students: "🎓",
  Staff: "👤", Courses: "📚", General: "🔍",
};

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState<SearchResult[]>([]);
  const [useAI, setUseAI] = useState(false);
  const { results: aiResults, loading: aiLoading, search: aiSearch, setResults: setAiResults } = useSmartSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Local keyword search
  useEffect(() => {
    if (query.trim() === "") {
      setLocalResults([]);
      setAiResults([]);
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
    setLocalResults(filtered);

    // If local results are few or query is complex (contains question words), trigger AI search
    const isComplexQuery = /\b(what|where|how|when|who|which|can|does|is|are|tell|show|find|get)\b/i.test(query);
    if (query.length > 5 && (filtered.length < 3 || isComplexQuery)) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setUseAI(true);
        aiSearch(query);
      }, 600);
    } else {
      setUseAI(false);
    }
  }, [query, aiSearch, setAiResults]);

  const handleSelect = (path: string) => {
    navigate(path);
    setQuery("");
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const displayResults = useAI && aiResults.length > 0 ? aiResults : null;
  const hasLocalResults = localResults.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
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
                  placeholder="Ask anything — 'How do I apply?' or search by keyword..."
                  className="flex-1 border-0 focus-visible:ring-0 text-lg bg-transparent"
                />
                {aiLoading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* AI badge */}
              {useAI && (
                <div className="px-4 py-2 bg-primary/5 border-b border-border flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-primary font-medium">AI-powered search active</span>
                </div>
              )}

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() !== "" && !hasLocalResults && !displayResults && !aiLoading && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No results found for "{query}"</p>
                    <p className="text-sm text-muted-foreground mt-2">Try asking a question or use different keywords</p>
                  </div>
                )}

                {/* AI Results */}
                {displayResults && displayResults.length > 0 && (
                  <div className="p-2">
                    <p className="px-3 py-1 text-xs font-medium text-primary flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> AI Results
                    </p>
                    {displayResults.map((result, index) => (
                      <motion.button
                        key={result.path + index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(result.path)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
                          {categoryIcons[result.category] || "🔍"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {result.title}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{result.category}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Local keyword results */}
                {hasLocalResults && (
                  <div className="p-2">
                    {displayResults && displayResults.length > 0 && (
                      <p className="px-3 py-1 text-xs font-medium text-muted-foreground mt-2">More results</p>
                    )}
                    {localResults.slice(0, displayResults ? 5 : 15).map((result, index) => (
                      <motion.button
                        key={result.path + index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => handleSelect(result.path)}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-colors text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <result.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{result.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{result.description}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{result.category}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {query.trim() === "" && (
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-primary" /> Try asking naturally
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["How do I apply?", "What courses does CS offer?", "Where is the faculty?", "Grading system"].map((item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Quick Links</p>
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
