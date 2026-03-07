import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Faculty of Computing Virtual Assistant at the University of Ibadan, Nigeria. You help students, prospective students, staff, and visitors with information about the faculty.

KEY INFORMATION:
- The Faculty of Computing has 4 departments: Computer Science & AI, Data Science, ICT (Information & Communication Technology), and Software Engineering.
- Dean: Prof. A. B. Adeyemo (B.Sc. Engineering Physics from Ife, PGD, M.Tech., PhD Computer Science from Akure). Specialization: Data Mining, Mobile and Internet Computing. Email: ab.adeyemo@ui.edu.ng
- HOD Data Science: Dr. Adebola K. Ojo
- HOD ICT: Prof. O. Osunade
- HOD Software Engineering: Dr. Ibiyinka T. Ayorinde

ADMISSION:
- Undergraduate: Requires 5 O'Level credits including Mathematics and English, UTME score meeting cut-off, Post-UTME screening. Physics/Further Math recommended.
- Postgraduate: M.Sc., M.Phil., Ph.D. programs available in Computer Science, Data Science, Information Technology, Information Science.
- Apply at https://admissions.ui.edu.ng (UG) or https://spgs.ui.edu.ng (PG)

GRADING:
- A=5 (70-100%), B=4 (60-69%), C=3 (50-59%), D=2 (45-49%), E=1 (40-44%), F=0 (0-39%)
- First Class: 4.50-5.00, 2:1: 3.50-4.49, 2:2: 2.40-3.49, Third: 1.50-2.39, Pass: 1.00-1.49

REGISTRATION: Done through UI Student Portal (https://studentportal.ui.edu.ng). Fee payment must be completed first.

CONDUCT: Students must maintain good conduct. Misconducts include exam malpractice, unruly behavior, vandalism, indecent dressing, insubordination. Criminal offences include burglary, assault, fraud, theft, cult membership, arson, drug possession. Offenders face the Student Disciplinary Committee.

WEBSITE PAGES:
- Home: /
- History: /history
- Departments: /departments, /departments/cs-ai, /departments/data-science, /departments/ict, /departments/software
- Dean's Office: /deans-office, /deans-office/dean, /deans-office/staff, /deans-office/journals
- Students: /students, /students/admission, /students/activities, /students/registration, /students/grading, /students/conduct
- Alumni: /alumni

RECOMMENDATIONS: When users ask questions, also suggest related pages they might find useful. Format page links as [Page Name](/path).

Be helpful, concise, and professional. If you don't know something specific, suggest where on the website the user might find it or recommend contacting the faculty directly. Always be encouraging to prospective students.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
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

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
