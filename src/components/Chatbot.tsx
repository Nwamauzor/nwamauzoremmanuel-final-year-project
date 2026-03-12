import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ChevronRight, GraduationCap, Plus, Trash2, MessageSquare, ArrowLeft, LogIn, LogOut, Eye, EyeOff, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

type Msg = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; created_at: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const getSessionId = () => {
  let sid = localStorage.getItem("chat_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("chat_session_id", sid);
  }
  return sid;
};

const suggestedQuestions = [
  "What are the admission requirements?",
  "What departments are in the faculty?",
  "How is the grading system structured?",
  "Who is the Dean of the faculty?",
  "Explain machine learning in simple terms",
  "Tips for acing university exams",
];

const getPageRecommendations = (pathname: string): string[] => {
  if (pathname.includes("/departments/cs-ai")) {
    return ["Tell me about AI lecturers in CS department", "What courses does CS & AI offer?", "Career paths in Computer Science"];
  }
  if (pathname.includes("/departments/data-science")) {
    return ["Who are the Data Science lecturers?", "What is Big Data Computing about?", "Career paths in Data Science"];
  }
  if (pathname.includes("/departments/ict")) {
    return ["Tell me about ICT department staff", "What is Cybersecurity about?", "Career paths in ICT"];
  }
  if (pathname.includes("/departments/software")) {
    return ["Tell me about Software Engineering lecturers", "What courses are in Software Engineering?", "Career paths in Software Engineering"];
  }
  if (pathname.includes("/departments")) {
    return ["Compare the four departments", "Which department should I choose?", "What are the career prospects?"];
  }
  if (pathname.includes("/students")) {
    return ["What are the admission requirements?", "Explain the grading system", "What are the conduct rules?"];
  }
  return suggestedQuestions;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const sessionId = getSessionId();
  const pageQuestions = getPageRecommendations(location.pathname);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => setAuthUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) loadConversations();
  }, [isOpen, authUser]);

  const requestLocation = () =>
    new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (userLocation) {
        resolve(userLocation);
        return;
      }

      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(coords);
          setLocationLoading(false);
          resolve(coords);
        },
        (err) => {
          setLocationLoading(false);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
      );
    });

  const handleLocationDirections = async () => {
    try {
      const coords = await requestLocation();
      const mapsLink = `https://www.google.com/maps/dir/${coords.lat},${coords.lng}/7.4441,3.8997`;
      await sendMessage(
        `Use my live coordinates (lat: ${coords.lat}, lng: ${coords.lng}) and give accurate directions to the Faculty of Computing, University of Ibadan. Start with this Google Maps route link: ${mapsLink}. Also include a reliable landmark-based route from UI First Gate to the faculty.`,
      );
    } catch {
      await sendMessage(
        "I could not enable live location. Please provide accurate directions from UI First Gate to Faculty of Computing and include a Google Maps route link.",
      );
    }
  };

  const loadConversations = async () => {
    let query = supabase
      .from("chat_conversations")
      .select("id, title, created_at")
      .order("updated_at", { ascending: false });

    if (authUser) {
      query = query.eq("user_id", authUser.id);
    } else {
      query = query.eq("session_id", sessionId).is("user_id", null);
    }

    const { data } = await query;
    if (data) setConversations(data);
  };

  const loadMessages = async (convId: string) => {
    const { data } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data as Msg[]);
      setCurrentConversationId(convId);
      setShowHistory(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setShowHistory(false);
  };

  const deleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from("chat_messages").delete().eq("conversation_id", convId);
    await supabase.from("chat_conversations").delete().eq("id", convId);
    setConversations((prev) => prev.filter((c) => c.id !== convId));
    if (currentConversationId === convId) startNewChat();
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) { setAuthLoading(false); return; }
    } else {
      const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
      if (error) { setAuthLoading(false); return; }
    }
    setShowAuth(false);
    setAuthEmail("");
    setAuthPassword("");
    setAuthLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (!error) setShowAuth(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setMessages([]);
    setCurrentConversationId(null);
    setConversations([]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let convId = currentConversationId;

    if (!convId) {
      const title = text.trim().slice(0, 60);
      const insertData: any = { session_id: sessionId, title };
      if (authUser) insertData.user_id = authUser.id;

      const { data } = await supabase
        .from("chat_conversations")
        .insert(insertData)
        .select("id")
        .single();
      if (data) {
        convId = data.id;
        setCurrentConversationId(convId);
        setConversations((prev) => [{ id: convId!, title, created_at: new Date().toISOString() }, ...prev]);
      }
    } else {
      await supabase.from("chat_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
    }

    if (convId) {
      await supabase.from("chat_messages").insert({ conversation_id: convId, role: "user", content: text.trim() });
    }

    let assistantSoFar = "";
    const allMessages = [...messages, userMsg];

    // Build context with location if available
    let contextContent = `[Context: User is currently viewing ${location.pathname}.`;
    if (userLocation) {
      const mapsLink = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/7.4441,3.8997`;
      contextContent += ` User location: lat ${userLocation.lat}, lng ${userLocation.lng}. Precomputed directions link: ${mapsLink}.`;
    }
    contextContent += " Provide contextual recommendations when relevant.]";

    const contextMsg: Msg = { role: "user", content: contextContent };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [contextMsg, ...allMessages] }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (convId && assistantSoFar) {
        await supabase.from("chat_messages").insert({ conversation_id: convId, role: "assistant", content: assistantSoFar });
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again shortly." },
      ]);
    }
    setIsLoading(false);
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setIsOpen(false);
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 px-4 py-3 sm:px-5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold text-sm hidden sm:inline">Gandus AI</span>
            <span className="font-semibold text-xs sm:hidden">Gandus</span>
            <motion.span
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent border-2 border-primary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] sm:max-w-[calc(100vw-2rem)] h-full sm:h-[600px] sm:max-h-[calc(100vh-6rem)] bg-card border-0 sm:border sm:border-border sm:rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 sm:gap-3">
                {(showHistory || showAuth) && (
                  <button onClick={() => { setShowHistory(false); setShowAuth(false); }} className="p-1 rounded-lg hover:bg-primary-foreground/10">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm">Gandus AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[10px] sm:text-xs opacity-90">
                      {showHistory ? "Chat History" : showAuth ? "Sign In" : authUser ? `${authUser.email}` : "Online • Ask me anything"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {authUser ? (
                  <button onClick={handleSignOut} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="Sign Out">
                    <LogOut className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={() => setShowAuth(!showAuth)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="Sign In to save chats">
                    <LogIn className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => setShowHistory(!showHistory)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="Chat History">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button onClick={startNewChat} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" title="New Chat">
                  <Plus className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showAuth ? (
              /* Auth Panel */
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <LogIn className="w-10 h-10 text-primary mx-auto mb-2" />
                    <h3 className="font-display font-bold text-foreground">Sign In</h3>
                    <p className="text-xs text-muted-foreground mt-1">Sign in to save your chat history across devices</p>
                  </div>
                  <form onSubmit={handleAuthSubmit} className="space-y-3">
                    <Input
                      type="email"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="Email address"
                      className="text-sm"
                      required
                    />
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="Password"
                        className="text-sm pr-10"
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button type="submit" className="w-full text-sm" disabled={authLoading}>
                      {authLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"}
                    </Button>
                  </form>
                  <Button variant="outline" className="w-full text-sm" onClick={handleGoogleSignIn}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    {authMode === "login" ? "No account? " : "Have an account? "}
                    <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-primary hover:underline">
                      {authMode === "login" ? "Register" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>
            ) : showHistory ? (
              /* History Panel */
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                <button
                  onClick={startNewChat}
                  className="flex items-center gap-2 w-full px-3 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Start New Chat
                </button>
                {!authUser && (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    <button onClick={() => { setShowHistory(false); setShowAuth(true); }} className="text-primary hover:underline">Sign in</button> to save chats across devices
                  </p>
                )}
                {conversations.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">No chat history yet</p>
                ) : (
                  conversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      className={`flex items-center justify-between gap-2 px-3 py-3 rounded-lg cursor-pointer transition-colors text-sm ${
                        currentConversationId === conv.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-foreground"
                      }`}
                      onClick={() => loadMessages(conv.id)}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MessageCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{conv.title}</span>
                      </div>
                      <button
                        onClick={(e) => deleteConversation(conv.id, e)}
                        className="p-1 rounded hover:bg-destructive/10 hover:text-destructive flex-shrink-0 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            ) : (
              /* Messages */
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm p-3 sm:p-4 text-sm text-foreground max-w-[85%] leading-relaxed">
                        👋 Hi! I'm <strong>Gandus AI</strong>, your academic assistant. I can help with:
                        <ul className="mt-2 space-y-1 text-muted-foreground text-xs sm:text-sm">
                          <li>📚 Faculty info & admissions</li>
                          <li>🎓 Academic guidance & study tips</li>
                          <li>💡 Computing concepts explained</li>
                          <li>🔬 Research & career advice</li>
                          <li>📍 Directions to the faculty</li>
                        </ul>
                        {!authUser && (
                          <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-2">
                            💡 <button onClick={() => setShowAuth(true)} className="text-primary hover:underline font-medium">Sign in</button> to save your chat history
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location quick action */}
                    <div className="pl-9 sm:pl-11">
                      <button
                        onClick={handleLocationDirections}
                        className="flex items-center gap-2 text-xs text-left px-3 py-2.5 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent-foreground transition-colors w-full group border border-accent/20"
                      >
                        <Navigation className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span>
                          {userLocation ? "Get directions from my location to Faculty of Computing" : "📍 Get directions to the Faculty of Computing"}
                        </span>
                      </button>
                      {!userLocation && (
                        <button
                          onClick={requestLocation}
                          disabled={locationLoading}
                          className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-primary mt-1.5 ml-1 transition-colors"
                        >
                          <MapPin className="w-3 h-3" />
                          {locationLoading ? "Getting location..." : "Enable location for personalized directions"}
                        </button>
                      )}
                      {userLocation && (
                        <p className="text-[10px] text-muted-foreground mt-1 ml-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> Location enabled
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 pl-9 sm:pl-11">
                      <p className="text-xs text-muted-foreground font-medium">
                        {location.pathname !== "/" ? "Suggestions for this page:" : "Try asking:"}
                      </p>
                      {pageQuestions.slice(0, 4).map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="flex items-center gap-2 text-xs text-left px-3 py-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors w-full group"
                        >
                          <ChevronRight className="w-3 h-3 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-primary/10"
                    }`}>
                      {msg.role === "user" ? <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />}
                    </div>
                    <div className={`rounded-2xl p-3 sm:p-4 max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm text-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}>
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none text-sm leading-relaxed [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-semibold [&_h3]:font-semibold [&_code]:bg-primary/10 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs">
                          <ReactMarkdown
                            components={{
                              a: ({ href, children }) => (
                                <button
                                  onClick={() => href && handleLinkClick(href)}
                                  className="text-primary underline hover:text-primary/80 transition-colors"
                                >
                                  {children}
                                </button>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="text-sm">{msg.content}</span>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-sm p-3">
                      <motion.div className="flex gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary/40"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {!showHistory && !showAuth && (
              <div className="p-2 sm:p-3 border-t border-border bg-muted/30">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about academics, courses, directions..."
                    className="flex-1 bg-background rounded-xl px-3 sm:px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 border border-border"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="rounded-xl h-10 w-10 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground text-center mt-1.5">
                  Gandus AI • Faculty of Computing, University of Ibadan
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
