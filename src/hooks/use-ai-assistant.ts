import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SmartSearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
  relevance: number;
}

interface ContentSuggestion {
  type: "improvement" | "missing" | "update";
  page: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface AnalyticsInsight {
  title: string;
  description: string;
  icon: "trending" | "alert" | "info" | "success";
}

interface TopTopic {
  topic: string;
  count: number;
  trend: "rising" | "stable" | "declining";
}

interface SuggestedFAQ {
  question: string;
  answer: string;
}

interface PageSummary {
  summary: string;
  highlights: string[];
  aiTip: string;
}

export function useSmartSearch() {
  const [results, setResults] = useState<SmartSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "smart_search", context: { query } },
      });
      if (error) throw error;
      const parsed = data?.result;
      if (Array.isArray(parsed)) {
        setResults(parsed);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.error("Smart search error:", e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, search, setResults };
}

export function useContentSuggestions() {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSuggestions = useCallback(async (context: {
    staffCount: number;
    coursesCount: number;
    timetableCount: number;
    contentCount: number;
    journalsCount: number;
    pagesWithContent: string[];
    pagesWithoutContent: string[];
  }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "content_suggestion", context },
      });
      if (error) throw error;
      const parsed = data?.result;
      setSuggestions(parsed?.suggestions || []);
      setSummary(parsed?.summary || "");
    } catch (e) {
      console.error("Content suggestions error:", e);
      toast({ title: "AI unavailable", description: "Could not generate suggestions right now.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return { suggestions, summary, loading, fetchSuggestions };
}

export function useAnalyticsInsights() {
  const [topTopics, setTopTopics] = useState<TopTopic[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [suggestedFAQ, setSuggestedFAQ] = useState<SuggestedFAQ[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "analytics_insights", context: {} },
      });
      if (error) throw error;
      const parsed = data?.result;
      setTopTopics(parsed?.topTopics || []);
      setInsights(parsed?.insights || []);
      setSuggestedFAQ(parsed?.suggestedFAQ || []);
      setSummary(parsed?.summary || "");
    } catch (e) {
      console.error("Analytics insights error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { topTopics, insights, suggestedFAQ, summary, loading, fetchInsights };
}

export function usePageSummary() {
  const [summaryData, setSummaryData] = useState<PageSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = useCallback(async (pageName: string, pagePath: string, pageContext?: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "page_summary", context: { pageName, pagePath, pageContext } },
      });
      if (error) throw error;
      const parsed = data?.result;
      if (parsed?.summary) {
        setSummaryData(parsed);
      }
    } catch (e) {
      console.error("Page summary error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { summaryData, loading, fetchSummary };
}
