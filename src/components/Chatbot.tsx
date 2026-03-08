import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, ChevronRight, GraduationCap, Plus, Trash2, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

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

// Get page-aware recommendations
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

  // Load conversations on open
  useEffect(() => {
    if (isOpen) loadConversations();
  }, [isOpen]);

  const loadConversations = async () => {
    const { data } = await supabase
      .from("chat_conversations")
      .select("id, title, created_at")
      .eq("session_id", sessionId)
      .order("updated_at", { ascending: false });
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

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let convId = currentConversationId;

    // Create conversation if new
    if (!convId) {
      const title = text.trim().slice(0, 60);
      const { data } = await supabase
        .from("chat_conversations")
        .insert({ session_id: sessionId, title })
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

    // Save user message
    if (convId) {
      await supabase.from("chat_messages").insert({ conversation_id: convId, role: "user", content: text.trim() });
    }

    let assistantSoFar = "";
    const allMessages = [...messages, userMsg];

    // Add page context to help recommendations
    const contextMsg: Msg = {
      role: "user",
      content: `[Context: User is currently viewing ${location.pathname}. Provide contextual recommendations when relevant.]`,
    };

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

      // Save assistant response
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
            <span className="font-semibold text-sm hidden sm:inline">🤖 AI Assistant</span>
            <span className="font-semibold text-xs sm:hidden">Chat</span>
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[400px] sm:max-w-[calc(100vw-2rem)] h-full sm:h-[600px] sm:max-h-[calc(100vh-6rem)] bg-card border-0 sm:border sm:border-border sm:rounded-2xl shadow-elevated flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-primary text-primary-foreground">
              <div className="flex items-center gap-2 sm:gap-3">
                {showHistory && (
                  <button onClick={() => setShowHistory(false)} className="p-1 rounded-lg hover:bg-primary-foreground/10">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs sm:text-sm">🤖 AI Academic Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-[10px] sm:text-xs opacity-90">{showHistory ? "Chat History" : "Online • Ask me anything"}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  title="Chat History"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={startNewChat}
                  className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors"
                  title="New Chat"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showHistory ? (
              /* History Panel */
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
                <button
                  onClick={startNewChat}
                  className="flex items-center gap-2 w-full px-3 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Start New Chat
                </button>
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
                        👋 Hi! I'm your <strong>AI Academic Assistant</strong>. I can help with:
                        <ul className="mt-2 space-y-1 text-muted-foreground text-xs sm:text-sm">
                          <li>📚 Faculty info & admissions</li>
                          <li>🎓 Academic guidance & study tips</li>
                          <li>💡 Computing concepts explained</li>
                          <li>🔬 Research & career advice</li>
                        </ul>
                      </div>
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
            {!showHistory && (
              <div className="p-2 sm:p-3 border-t border-border bg-muted/30">
                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about academics, courses, tips..."
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
                  AI-powered • Faculty of Computing, University of Ibadan
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
