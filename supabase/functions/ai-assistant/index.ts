import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "smart_search": {
        systemPrompt = `You are an intelligent search assistant for the Faculty of Computing, University of Ibadan website. Given a natural language query, return a JSON array of the most relevant results from the site content.

Each result must have: { "title": string, "description": string, "path": string, "category": string, "relevance": number (0-100) }

Available pages and their paths:
- Home: /
- History: /history
- Departments overview: /departments
- Computer Science & AI: /departments/cs-ai
- Data Science: /departments/data-science
- ICT: /departments/ict
- Software Engineering: /departments/software
- Dean's Office: /deans-office
- Dean's Profile: /deans-office/dean
- Faculty Staff: /deans-office/staff
- Journals: /deans-office/journals
- Students: /students
- Admission: /students/admission
- Activities & Timetable: /students/activities
- Course Registration: /students/registration
- Grading System: /students/grading
- Conduct & Discipline: /students/conduct
- Alumni: /alumni

Faculty info: 4 departments (CS & AI, Data Science, ICT, Software Engineering), 5 programmes (Computer Science, Data Science, Cybersecurity, ICT, Software Engineering). Dean: Prof. A.B. Adeyemo. Staff includes professors, senior lecturers, etc.

Return ONLY a valid JSON array, no markdown, no explanation. Max 8 results, sorted by relevance descending.`;
        userPrompt = context.query;
        break;
      }

      case "content_suggestion": {
        systemPrompt = `You are an AI content advisor for the Faculty of Computing, University of Ibadan admin panel. Analyze the provided site content data and generate actionable suggestions for improvement.

Return a JSON object with:
{
  "suggestions": [
    { "type": "improvement" | "missing" | "update", "page": string, "title": string, "description": string, "priority": "high" | "medium" | "low" }
  ],
  "summary": "A brief overall assessment"
}

Max 6 suggestions. Be specific and actionable. Focus on what's missing, outdated, or could be improved for a faculty website.`;
        userPrompt = `Here is the current site content data:\n\nStaff count: ${context.staffCount}\nCourses count: ${context.coursesCount}\nTimetable entries: ${context.timetableCount}\nSite content entries: ${context.contentCount}\nJournals: ${context.journalsCount}\n\nPages with content: ${context.pagesWithContent?.join(", ") || "none"}\nPages without content: ${context.pagesWithoutContent?.join(", ") || "none"}`;
        break;
      }

      case "analytics_insights": {
        systemPrompt = `You are an AI analytics engine for the Faculty of Computing chatbot system. Analyze the chat knowledge base data and provide insights.

Return a JSON object with:
{
  "topTopics": [{ "topic": string, "count": number, "trend": "rising" | "stable" | "declining" }],
  "insights": [{ "title": string, "description": string, "icon": "trending" | "alert" | "info" | "success" }],
  "suggestedFAQ": [{ "question": string, "answer": string }],
  "summary": string
}

Max 5 items per array. Be data-driven and practical.`;

        // Fetch chat knowledge data
        let knowledgeData: any[] = [];
        try {
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/chat_knowledge?order=usage_count.desc&limit=50`,
            {
              headers: {
                apikey: SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
              },
            }
          );
          if (res.ok) knowledgeData = await res.json();
        } catch {}

        // Fetch recent conversations count
        let conversationCount = 0;
        try {
          const res = await fetch(
            `${SUPABASE_URL}/rest/v1/chat_conversations?select=id&limit=1000`,
            {
              headers: {
                apikey: SUPABASE_SERVICE_ROLE_KEY,
                Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                Prefer: "count=exact",
              },
            }
          );
          if (res.ok) {
            const countHeader = res.headers.get("content-range");
            if (countHeader) {
              const match = countHeader.match(/\/(\d+)/);
              if (match) conversationCount = parseInt(match[1]);
            }
          }
        } catch {}

        userPrompt = `Chat knowledge base entries: ${knowledgeData.length}\nTotal conversations: ${conversationCount}\n\nTop questions asked:\n${knowledgeData.slice(0, 20).map((k: any) => `- "${k.question.slice(0, 100)}" (asked ${k.usage_count} times)`).join("\n") || "No data yet"}`;
        break;
      }

      case "page_summary": {
        systemPrompt = `You are an AI that generates brief, engaging summary cards for pages on the Faculty of Computing, University of Ibadan website. 

Return a JSON object with:
{
  "summary": "A concise 1-2 sentence summary of what this page offers",
  "highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "aiTip": "A helpful tip or fun fact related to this page content"
}

Be warm, informative, and student-friendly.`;
        userPrompt = `Generate a summary for the "${context.pageName}" page. Page path: ${context.pagePath}. Context: ${context.pageContext || "Faculty of Computing, University of Ibadan"}`;
        break;
      }

      default:
        return new Response(JSON.stringify({ error: "Unknown action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Try to parse as JSON, stripping markdown code fences if present
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { raw: content };
    }

    return new Response(JSON.stringify({ result: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
