import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Lightbulb, Star } from "lucide-react";
import { usePageSummary } from "@/hooks/use-ai-assistant";

interface AiPageSummaryProps {
  pageName: string;
  pagePath: string;
  pageContext?: string;
}

const AiPageSummary = ({ pageName, pagePath, pageContext }: AiPageSummaryProps) => {
  const { summaryData, loading, fetchSummary } = usePageSummary();

  useEffect(() => {
    fetchSummary(pageName, pagePath, pageContext);
  }, [pageName, pagePath, pageContext, fetchSummary]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6"
      >
        <div className="flex items-center gap-2 text-primary text-sm">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="font-medium">Gadus AI is generating a summary...</span>
        </div>
      </motion.div>
    );
  }

  if (!summaryData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
            <span>Gadus AI Summary</span>
          </p>
          <p className="text-sm text-foreground/90 mb-3">{summaryData.summary}</p>

          {summaryData.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {summaryData.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                >
                  <Star className="w-3 h-3" />
                  {h}
                </span>
              ))}
            </div>
          )}

          {summaryData.aiTip && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground bg-card/50 rounded-lg p-2.5">
              <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span>{summaryData.aiTip}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AiPageSummary;
