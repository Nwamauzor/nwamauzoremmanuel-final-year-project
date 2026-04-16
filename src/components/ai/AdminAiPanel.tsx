import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, AlertCircle, Info, CheckCircle, Loader2, Brain, MessageSquare, Lightbulb, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentSuggestions, useAnalyticsInsights } from "@/hooks/use-ai-assistant";

interface AdminAiPanelProps {
  staffCount: number;
  coursesCount: number;
  timetableCount: number;
  contentCount: number;
  journalsCount: number;
  pagesWithContent: string[];
  pagesWithoutContent: string[];
}

const insightIcons = {
  trending: TrendingUp,
  alert: AlertCircle,
  info: Info,
  success: CheckCircle,
};

const priorityColors = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const AdminAiPanel = (props: AdminAiPanelProps) => {
  const [expanded, setExpanded] = useState(true);
  const { suggestions, summary: contentSummary, loading: suggestionsLoading, fetchSuggestions } = useContentSuggestions();
  const { topTopics, insights, suggestedFAQ, summary: analyticsSummary, loading: insightsLoading, fetchInsights } = useAnalyticsInsights();

  const handleFetchSuggestions = () => fetchSuggestions(props);
  const handleFetchInsights = () => fetchInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-6 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-foreground">AI Command Center</h3>
            <p className="text-xs text-muted-foreground">Powered by Gadus AI</p>
          </div>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Button size="sm" variant="outline" onClick={handleFetchSuggestions} disabled={suggestionsLoading}
                className="text-xs border-primary/30 hover:bg-primary/10">
                {suggestionsLoading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Lightbulb className="w-3.5 h-3.5 mr-1.5" />}
                Content Suggestions
              </Button>
              <Button size="sm" variant="outline" onClick={handleFetchInsights} disabled={insightsLoading}
                className="text-xs border-primary/30 hover:bg-primary/10">
                {insightsLoading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5 mr-1.5" />}
                Chatbot Analytics
              </Button>
            </div>

            {/* Content Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> Content Suggestions
                </p>
                {contentSummary && (
                  <p className="text-xs text-muted-foreground mb-2 italic">{contentSummary}</p>
                )}
                <div className="space-y-2">
                  {suggestions.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card border border-border rounded-lg p-3 flex items-start gap-3"
                    >
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${priorityColors[s.priority]}`}>
                        {s.priority}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                        <span className="text-[10px] text-primary mt-1 inline-block">Page: {s.page}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Insights */}
            {(insights.length > 0 || topTopics.length > 0) && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Chatbot Analytics
                </p>
                {analyticsSummary && (
                  <p className="text-xs text-muted-foreground mb-2 italic">{analyticsSummary}</p>
                )}

                {/* Top topics */}
                {topTopics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {topTopics.map((t, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {t.trend === "rising" && <ArrowUpRight className="w-3 h-3" />}
                        {t.topic} ({t.count})
                      </span>
                    ))}
                  </div>
                )}

                {/* Insights */}
                <div className="space-y-2">
                  {insights.map((ins, i) => {
                    const Icon = insightIcons[ins.icon] || Info;
                    return (
                      <div key={i} className="bg-card border border-border rounded-lg p-3 flex items-start gap-2">
                        <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{ins.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{ins.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Suggested FAQ */}
            {suggestedFAQ.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Suggested FAQ (from chatbot data)
                </p>
                <div className="space-y-2">
                  {suggestedFAQ.map((faq, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground">Q: {faq.question}</p>
                      <p className="text-xs text-muted-foreground mt-1">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {suggestions.length === 0 && insights.length === 0 && !suggestionsLoading && !insightsLoading && (
              <div className="text-center py-4">
                <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Click a button above to get AI-powered insights</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminAiPanel;
