import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { LogOut, Plus, Trash2, Edit2, Save, X, Shield, Users, BookOpen, Calendar, Eye, EyeOff, KeyRound, FileText, Globe, Moon, Sun, Search, LayoutDashboard, Database, Clock } from "lucide-react";
import { lovable } from "@/integrations/lovable/index";
import { useTheme } from "next-themes";
import AdminAiPanel from "@/components/ai/AdminAiPanel";

const ADMIN_VERIFIED_KEY = "admin_verified_uid";

const safeStorage = {
  get: (key: string) => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // ignore unavailable storage contexts
    }
  },
  remove: (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore unavailable storage contexts
    }
  },
};

const MANAGED_PAGES = [
  "home",
  "history",
  "departments",
  "departments/cs-ai",
  "departments/data-science",
  "departments/ict",
  "departments/software",
  "deans-office",
  "deans-office/dean",
  "deans-office/staff",
  "deans-office/journals",
  "students",
  "students/admission",
  "students/activities",
  "students/registration",
  "students/grading",
  "students/conduct",
  "alumni",
  "alumni/home",
  "alumni/services",
];

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [accessCode, setAccessCode] = useState("");
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [contentFilterPage, setContentFilterPage] = useState("all");
  const [contentFilterSection, setContentFilterSection] = useState("");
  const [staffSearch, setStaffSearch] = useState("");
  const [coursesSearch, setCoursesSearch] = useState("");
  const [timetableSearch, setTimetableSearch] = useState("");
  const [journalsSearch, setJournalsSearch] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();

  // Data states
  const [staff, setStaff] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [deleteDialog, setDeleteDialog] = useState<{ table: string; id: string; name: string } | null>(null);

  // New item forms
  const [newStaff, setNewStaff] = useState({ name: "", qualification: "", designation: "", specialization: "", department: "", staff_type: "academic" });
  const [newCourse, setNewCourse] = useState({ code: "", title: "", unit: 2, status: "Compulsory", department: "", level: "100L", semester: "first" });
  const [newTimetable, setNewTimetable] = useState({ day: "Monday", time_slot: "", course_code: "", venue: "", lecturer: "", department: "", semester: "first" });
  const [newContent, setNewContent] = useState({ page: "", section: "", content_key: "", content_value: "", content_type: "text", sort_order: 0 });
  const [showNewForm, setShowNewForm] = useState<string | null>(null);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const savedUid = safeStorage.get(ADMIN_VERIFIED_KEY);
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (data) {
        if (savedUid !== userId) safeStorage.set(ADMIN_VERIFIED_KEY, userId);
        setIsAdmin(true);
        return true;
      }

      safeStorage.remove(ADMIN_VERIFIED_KEY);
    } catch (e) {
      console.error("Admin check error:", e);
    }

    setIsAdmin(false);
    return false;
  }, []);

  // Single initialization - no race conditions
  useEffect(() => {
    let mounted = true;
    let resolved = false;

    const resolveAuth = async (currentUser: any) => {
      if (!mounted || resolved) return;
      resolved = true;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminRole(currentUser.id);
      }
      setLoading(false);
    };

    // Try getSession first
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && !resolved) {
        resolveAuth(session?.user ?? null);
      }
    });

    // Also listen for auth changes (handles sign in/out cleanly)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      const currentUser = session?.user ?? null;

      // For subsequent changes after initial load, avoid redundant role checks on token refresh.
      if (resolved) {
        setUser(currentUser);
        if (!currentUser) {
          setIsAdmin(false);
          safeStorage.remove(ADMIN_VERIFIED_KEY);
          return;
        }

        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          await checkAdminRole(currentUser.id);
        }
      } else {
        resolveAuth(currentUser);
      }
    });

    // Fallback timeout - if neither resolves in 3s, show login
    const timeout = setTimeout(() => {
      if (mounted && !resolved) {
        resolved = true;
        setLoading(false);
      }
    }, 3000);

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [checkAdminRole]);

  useEffect(() => {
    if (isAdmin) {
      loadStaff();
      loadCourses();
      loadTimetable();
      loadSiteContent();
      loadJournals();
    }
  }, [isAdmin]);

  const loadStaff = async () => {
    const { data } = await supabase.from("admin_staff").select("*").order("name");
    if (data) setStaff(data);
  };
  const loadCourses = async () => {
    const { data } = await supabase.from("admin_courses").select("*").order("code");
    if (data) setCourses(data);
  };
  const loadTimetable = async () => {
    const { data } = await supabase.from("admin_timetable").select("*").order("day");
    if (data) setTimetable(data);
  };
  const loadSiteContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("page").order("section").order("sort_order");
    if (data) setSiteContent(data);
  };
  const loadJournals = async () => {
    const { data } = await supabase.from("journals").select("*").order("created_at", { ascending: false });
    if (data) setJournals(data);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        else toast({ title: "Welcome back!" });
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        else toast({ title: "Account created", description: "Check your email to verify, then log in." });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (error) toast({ title: "Error", description: String(error), variant: "destructive" });
  };

  const handleLogout = async () => {
    safeStorage.remove(ADMIN_VERIFIED_KEY);
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const verifyAccessCode = async () => {
    if (verifyingCode) return;

    const normalizedCode = accessCode.trim();
    if (!normalizedCode) {
      toast({ title: "Access code required", description: "Please enter your access code.", variant: "destructive" });
      return;
    }

    if (!user?.id) {
      toast({ title: "Error", description: "Not authenticated. Please sign in again.", variant: "destructive" });
      return;
    }

    setVerifyingCode(true);
    try {
      const alreadyAdmin = await checkAdminRole(user.id);
      if (alreadyAdmin) {
        setAccessCode("");
        await Promise.all([loadStaff(), loadCourses(), loadTimetable(), loadSiteContent(), loadJournals()]);
        toast({ title: "Admin access active", description: "Welcome back to your dashboard." });
        return;
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw sessionError;
      }

      const session = sessionData.session;
      if (!session?.access_token) {
        const { data: refreshedData, error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError || !refreshedData.session?.access_token) {
          throw new Error("Session unavailable. Please sign in again.");
        }

        const refreshedResp = await supabase.functions.invoke("admin-setup", {
          body: { access_code: normalizedCode },
          headers: {
            Authorization: `Bearer ${refreshedData.session.access_token}`,
          },
        });

        if (refreshedResp.error) {
          throw new Error(refreshedResp.error.message || "Invalid access code");
        }

        if (!refreshedResp.data?.success) {
          throw new Error(refreshedResp.data?.error || "Invalid access code");
        }

        safeStorage.set(ADMIN_VERIFIED_KEY, refreshedData.session.user.id);
        setIsAdmin(true);
        setAccessCode("");
        await Promise.all([loadStaff(), loadCourses(), loadTimetable(), loadSiteContent(), loadJournals()]);
        toast({ title: "✅ Admin Access Granted", description: "Dashboard unlocked!" });
        return;
      }

      const resp = await supabase.functions.invoke("admin-setup", {
        body: { access_code: normalizedCode },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (resp.error) {
        throw new Error(resp.error.message || "Invalid access code");
      }

      if (!resp.data?.success) {
        throw new Error(resp.data?.error || "Invalid access code");
      }

      safeStorage.set(ADMIN_VERIFIED_KEY, session.user.id);
      setIsAdmin(true);
      setAccessCode("");
      await Promise.all([loadStaff(), loadCourses(), loadTimetable(), loadSiteContent(), loadJournals()]);
      toast({ title: "✅ Admin Access Granted", description: "Dashboard unlocked!" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to verify code";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setVerifyingCode(false);
    }
  };

  // CRUD operations
  const addItem = async (table: string, data: any, resetFn: () => void, loadFn: () => void, label: string) => {
    const { error } = await supabase.from(table as any).insert(data);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { loadFn(); resetFn(); setShowNewForm(null); toast({ title: `${label} added` }); }
  };

  const saveEdit = async (table: string, loadFn: () => void) => {
    if (!editingId) return;
    const updateData = { ...editData };
    delete updateData.id;
    delete updateData.created_at;
    const { error } = await supabase.from(table as any).update(updateData).eq("id", editingId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      setEditingId(null);
      setEditData({});
      loadFn();
      toast({ title: "Updated" });
    }
  };

  const confirmDelete = async () => {
    if (!deleteDialog) return;
    const { error } = await supabase.from(deleteDialog.table as any).delete().eq("id", deleteDialog.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      if (deleteDialog.table === "admin_staff") loadStaff();
      if (deleteDialog.table === "admin_courses") loadCourses();
      if (deleteDialog.table === "admin_timetable") loadTimetable();
      if (deleteDialog.table === "site_content") loadSiteContent();
      if (deleteDialog.table === "journals") loadJournals();
      toast({ title: "Deleted successfully" });
    }
    setDeleteDialog(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-display text-2xl font-bold text-foreground">Admin Portal</h1>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ui.edu.ng" className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">{authMode === "login" ? "Login" : "Register"}</Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {authMode === "login" ? "Need an account? " : "Have an account? "}
            <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="text-primary hover:underline">
              {authMode === "login" ? "Register" : "Login"}
            </button>
          </p>
          <p className="text-xs text-muted-foreground text-center mt-4">🔒 Restricted to authorized administrators only.</p>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <KeyRound className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Admin Verification</h1>
          <p className="text-muted-foreground mb-6 text-sm">Enter your unique admin access code to unlock the dashboard.</p>
          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showAccessCode ? "text" : "password"}
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter admin access code"
                className="text-center tracking-widest font-mono"
                onKeyDown={(e) => { if (e.key === "Enter" && accessCode.trim()) verifyAccessCode(); }}
              />
              <button type="button" onClick={() => setShowAccessCode(!showAccessCode)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showAccessCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button onClick={verifyAccessCode} disabled={!accessCode.trim() || verifyingCode} className="w-full">
              <Shield className="w-4 h-4 mr-2" />{verifyingCode ? "Verifying..." : "Verify & Unlock"}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />Sign Out
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Helper: Inline edit cell
  const EditableCell = ({ value, field, className = "" }: { value: string; field: string; className?: string }) => (
    editingId ? (
      <Input value={editData[field] || ""} onChange={(e) => setEditData({ ...editData, [field]: e.target.value })} className={`h-8 text-xs ${className}`} />
    ) : (
      <span className={className}>{value}</span>
    )
  );

  const ActionButtons = ({ item, table, loadFn, nameField = "name" }: { item: any; table: string; loadFn: () => void; nameField?: string }) => (
    <div className="flex gap-1">
      {editingId === item.id ? (
        <>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveEdit(table, loadFn)}><Save className="w-3 h-3" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingId(null); setEditData({}); }}><X className="w-3 h-3" /></Button>
        </>
      ) : (
        <>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingId(item.id); setEditData({ ...item }); }}><Edit2 className="w-3 h-3" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => setDeleteDialog({ table, id: item.id, name: item[nameField] || item.id })}><Trash2 className="w-3 h-3" /></Button>
        </>
      )}
    </div>
  );

  const filteredContent = siteContent.filter((item) => {
    const pagePass = contentFilterPage === "all" || item.page === contentFilterPage;
    const sectionPass = !contentFilterSection.trim() || item.section.toLowerCase().includes(contentFilterSection.trim().toLowerCase());
    return pagePass && sectionPass;
  });

  const contentByPage: Record<string, any[]> = filteredContent.reduce((acc: Record<string, any[]>, item: any) => {
    const key = `${item.page} / ${item.section}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const availableContentPages = Array.from(new Set([...MANAGED_PAGES, ...siteContent.map((item) => item.page)])).sort();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-xs">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              variant="outline"
              size="sm"
              title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4 mr-1" /> : <Moon className="w-4 h-4 mr-1" />}
              {resolvedTheme === "dark" ? "Light" : "Dark"}
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/" target="_blank">
                <Globe className="w-4 h-4 mr-1" />View Site
              </a>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-1" />Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Site Content", value: siteContent.length, icon: FileText, color: "from-blue-500/20 to-blue-500/5", iconColor: "text-blue-500" },
            { label: "Staff", value: staff.length, icon: Users, color: "from-emerald-500/20 to-emerald-500/5", iconColor: "text-emerald-500" },
            { label: "Courses", value: courses.length, icon: BookOpen, color: "from-amber-500/20 to-amber-500/5", iconColor: "text-amber-500" },
            { label: "Timetable", value: timetable.length, icon: Clock, color: "from-purple-500/20 to-purple-500/5", iconColor: "text-purple-500" },
            { label: "Journals", value: journals.length, icon: Database, color: "from-rose-500/20 to-rose-500/5", iconColor: "text-rose-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${stat.color} p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-background/60 backdrop-blur-sm ${stat.iconColor}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Command Center */}
        <AdminAiPanel
          staffCount={staff.length}
          coursesCount={courses.length}
          timetableCount={timetable.length}
          contentCount={siteContent.length}
          journalsCount={journals.length}
          pagesWithContent={[...new Set(siteContent.map((c: any) => c.page))]}
          pagesWithoutContent={MANAGED_PAGES.filter(p => !siteContent.some((c: any) => c.page === p))}
        />

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted mb-6">
            <TabsTrigger value="content" className="py-2 text-xs sm:text-sm gap-1">
              <FileText className="w-4 h-4 hidden sm:inline" />Content
            </TabsTrigger>
            <TabsTrigger value="staff" className="py-2 text-xs sm:text-sm gap-1">
              <Users className="w-4 h-4 hidden sm:inline" />Staff
            </TabsTrigger>
            <TabsTrigger value="courses" className="py-2 text-xs sm:text-sm gap-1">
              <BookOpen className="w-4 h-4 hidden sm:inline" />Courses
            </TabsTrigger>
            <TabsTrigger value="timetable" className="py-2 text-xs sm:text-sm gap-1">
              <Calendar className="w-4 h-4 hidden sm:inline" />Timetable
            </TabsTrigger>
            <TabsTrigger value="journals" className="py-2 text-xs sm:text-sm gap-1">
              <BookOpen className="w-4 h-4 hidden sm:inline" />Journals
            </TabsTrigger>
          </TabsList>

          {/* Site Content Tab */}
          <TabsContent value="content">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold">Site Content Management</h2>
                  <p className="text-xs text-muted-foreground">Add/edit content for any page and section across the site</p>
                </div>
                <Button size="sm" onClick={() => setShowNewForm(showNewForm === "content" ? null : "content")}>
                  <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Content</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <Select value={contentFilterPage} onValueChange={setContentFilterPage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All pages</SelectItem>
                    {availableContentPages.map((page) => (
                      <SelectItem key={page} value={page}>{page}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Filter by section"
                  value={contentFilterSection}
                  onChange={(e) => setContentFilterSection(e.target.value)}
                />
              </div>

              {showNewForm === "content" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Input
                        placeholder="Page or subpage path (e.g., history, departments/cs-ai)"
                        value={newContent.page}
                        onChange={(e) => setNewContent({ ...newContent, page: e.target.value.trim().toLowerCase() })}
                        list="managed-pages"
                      />
                      <datalist id="managed-pages">
                        {availableContentPages.map((p) => (
                          <option key={p} value={p} />
                        ))}
                      </datalist>
                    </div>
                    <Input placeholder="Section (e.g., hero, welcome, about)" value={newContent.section} onChange={(e) => setNewContent({ ...newContent, section: e.target.value })} />
                    <Input placeholder="Content Key (e.g., title, description)" value={newContent.content_key} onChange={(e) => setNewContent({ ...newContent, content_key: e.target.value })} />
                    <Select value={newContent.content_type} onValueChange={(v) => setNewContent({ ...newContent, content_type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="link">Link/URL</SelectItem>
                        <SelectItem value="list">List (comma-separated)</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Sort Order" type="number" value={newContent.sort_order} onChange={(e) => setNewContent({ ...newContent, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                  <Textarea placeholder="Content Value" value={newContent.content_value} onChange={(e) => setNewContent({ ...newContent, content_value: e.target.value })} rows={3} />
                  <Button onClick={() => addItem("site_content", newContent, () => setNewContent({ page: "", section: "", content_key: "", content_value: "", content_type: "text", sort_order: 0 }), loadSiteContent, "Content")} disabled={!newContent.page || !newContent.section || !newContent.content_key} size="sm">
                    <Save className="w-4 h-4 mr-1" />Save
                  </Button>
                </motion.div>
              )}

              {Object.keys(contentByPage).length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm mb-2">No site content entries yet.</p>
                  <p className="text-xs text-muted-foreground">Click "Add Content" to start managing site content. You can add text, paragraphs, links, and more for any page.</p>
                </div>
              ) : (
                Object.entries(contentByPage).map(([group, items]) => (
                  <div key={group} className="mb-6">
                    <h3 className="font-semibold text-sm text-primary mb-2 uppercase tracking-wide">{group}</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-xs hidden lg:table-cell">Page</TableHead>
                            <TableHead className="text-xs hidden md:table-cell">Section</TableHead>
                            <TableHead className="text-xs">Key</TableHead>
                            <TableHead className="text-xs hidden sm:table-cell">Type</TableHead>
                            <TableHead className="text-xs hidden sm:table-cell">Order</TableHead>
                            <TableHead className="text-xs">Value</TableHead>
                            <TableHead className="text-xs w-20">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item: any) => (
                            <TableRow key={item.id}>
                              <TableCell className="text-xs font-mono hidden lg:table-cell">
                                {editingId === item.id ? (
                                  <Input value={editData.page || ""} onChange={(e) => setEditData({ ...editData, page: e.target.value.trim().toLowerCase() })} className="h-8 text-xs" />
                                ) : item.page}
                              </TableCell>
                              <TableCell className="text-xs hidden md:table-cell">
                                {editingId === item.id ? (
                                  <Input value={editData.section || ""} onChange={(e) => setEditData({ ...editData, section: e.target.value })} className="h-8 text-xs" />
                                ) : item.section}
                              </TableCell>
                              <TableCell className="text-xs font-mono">
                                {editingId === item.id ? (
                                  <Input value={editData.content_key || ""} onChange={(e) => setEditData({ ...editData, content_key: e.target.value })} className="h-8 text-xs" />
                                ) : item.content_key}
                              </TableCell>
                              <TableCell className="text-xs hidden sm:table-cell">
                                {editingId === item.id ? (
                                  <Input value={editData.content_type || "text"} onChange={(e) => setEditData({ ...editData, content_type: e.target.value })} className="h-8 text-xs" />
                                ) : item.content_type}
                              </TableCell>
                              <TableCell className="text-xs hidden sm:table-cell">
                                {editingId === item.id ? (
                                  <Input type="number" value={editData.sort_order ?? 0} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="h-8 text-xs w-20" />
                                ) : item.sort_order}
                              </TableCell>
                              <TableCell className="text-xs max-w-[420px]">
                                {editingId === item.id ? (
                                  <Textarea value={editData.content_value || ""} onChange={(e) => setEditData({ ...editData, content_value: e.target.value })} className="text-xs min-h-[90px]" />
                                ) : (
                                  <span className="whitespace-pre-wrap break-words">{item.content_value}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <ActionButtons item={item} table="site_content" loadFn={loadSiteContent} nameField="content_key" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold">Staff Management</h2>
                <Button size="sm" onClick={() => setShowNewForm(showNewForm === "staff" ? null : "staff")}>
                  <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Staff</span>
                </Button>
              </div>

              {showNewForm === "staff" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} />
                    <Input placeholder="Designation" value={newStaff.designation} onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })} />
                    <Input placeholder="Qualification" value={newStaff.qualification} onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })} />
                    <Input placeholder="Specialization" value={newStaff.specialization} onChange={(e) => setNewStaff({ ...newStaff, specialization: e.target.value })} />
                    <Input placeholder="Department" value={newStaff.department} onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })} />
                    <Select value={newStaff.staff_type} onValueChange={(v) => setNewStaff({ ...newStaff, staff_type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => addItem("admin_staff", newStaff, () => setNewStaff({ name: "", qualification: "", designation: "", specialization: "", department: "", staff_type: "academic" }), loadStaff, "Staff")} disabled={!newStaff.name} size="sm">
                    <Save className="w-4 h-4 mr-1" />Save
                  </Button>
                </motion.div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Name</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Qualification</TableHead>
                      <TableHead className="text-xs">Designation</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Specialization</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Department</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Type</TableHead>
                      <TableHead className="text-xs w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs sm:text-sm">{editingId === s.id ? <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="h-8 text-xs" /> : s.name}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === s.id ? <Input value={editData.qualification || ""} onChange={(e) => setEditData({ ...editData, qualification: e.target.value })} className="h-8 text-xs" /> : s.qualification}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{editingId === s.id ? <Input value={editData.designation || ""} onChange={(e) => setEditData({ ...editData, designation: e.target.value })} className="h-8 text-xs" /> : s.designation}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === s.id ? <Input value={editData.specialization || ""} onChange={(e) => setEditData({ ...editData, specialization: e.target.value })} className="h-8 text-xs" /> : s.specialization}</TableCell>
                        <TableCell className="text-xs hidden lg:table-cell">{editingId === s.id ? <Input value={editData.department || ""} onChange={(e) => setEditData({ ...editData, department: e.target.value })} className="h-8 text-xs" /> : s.department}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === s.id ? <Input value={editData.staff_type || "academic"} onChange={(e) => setEditData({ ...editData, staff_type: e.target.value })} className="h-8 text-xs" /> : s.staff_type}</TableCell>
                        <TableCell><ActionButtons item={s} table="admin_staff" loadFn={loadStaff} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {staff.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No staff records. Click "Add Staff" to begin.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold">Course Management</h2>
                <Button size="sm" onClick={() => setShowNewForm(showNewForm === "courses" ? null : "courses")}>
                  <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Course</span>
                </Button>
              </div>

              {showNewForm === "courses" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="Course Code (e.g., CSC 301)" value={newCourse.code} onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })} />
                    <Input placeholder="Course Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                    <Input placeholder="Unit" type="number" value={newCourse.unit} onChange={(e) => setNewCourse({ ...newCourse, unit: parseInt(e.target.value) || 2 })} />
                    <Input placeholder="Department" value={newCourse.department} onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })} />
                    <Select value={newCourse.level} onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["100L", "200L", "300L", "400L"].map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Select value={newCourse.semester} onValueChange={(v) => setNewCourse({ ...newCourse, semester: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Semester</SelectItem>
                        <SelectItem value="second">Second Semester</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={newCourse.status} onValueChange={(v) => setNewCourse({ ...newCourse, status: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Compulsory">Compulsory</SelectItem>
                        <SelectItem value="Elective">Elective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => addItem("admin_courses", newCourse, () => setNewCourse({ code: "", title: "", unit: 2, status: "Compulsory", department: "", level: "100L", semester: "first" }), loadCourses, "Course")} disabled={!newCourse.code || !newCourse.title} size="sm">
                    <Save className="w-4 h-4 mr-1" />Save
                  </Button>
                </motion.div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Code</TableHead>
                      <TableHead className="text-xs">Title</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Unit</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Status</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Level</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Semester</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Department</TableHead>
                      <TableHead className="text-xs w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="text-xs font-mono">{editingId === c.id ? <Input value={editData.code || ""} onChange={(e) => setEditData({ ...editData, code: e.target.value })} className="h-8 text-xs" /> : c.code}</TableCell>
                        <TableCell className="text-xs">{editingId === c.id ? <Input value={editData.title || ""} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="h-8 text-xs" /> : c.title}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === c.id ? <Input type="number" value={editData.unit || 2} onChange={(e) => setEditData({ ...editData, unit: parseInt(e.target.value) || 2 })} className="h-8 text-xs w-16" /> : c.unit}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === c.id ? <Input value={editData.status || "Compulsory"} onChange={(e) => setEditData({ ...editData, status: e.target.value })} className="h-8 text-xs" /> : c.status}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === c.id ? <Input value={editData.level || "100L"} onChange={(e) => setEditData({ ...editData, level: e.target.value })} className="h-8 text-xs" /> : c.level}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === c.id ? <Input value={editData.semester || "first"} onChange={(e) => setEditData({ ...editData, semester: e.target.value })} className="h-8 text-xs" /> : c.semester}</TableCell>
                        <TableCell className="text-xs hidden lg:table-cell">{editingId === c.id ? <Input value={editData.department || ""} onChange={(e) => setEditData({ ...editData, department: e.target.value })} className="h-8 text-xs" /> : c.department}</TableCell>
                        <TableCell><ActionButtons item={c} table="admin_courses" loadFn={loadCourses} nameField="code" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {courses.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No courses yet.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Timetable Tab */}
          <TabsContent value="timetable">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold">Timetable Management</h2>
                <Button size="sm" onClick={() => setShowNewForm(showNewForm === "timetable" ? null : "timetable")}>
                  <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Entry</span>
                </Button>
              </div>

              {showNewForm === "timetable" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select value={newTimetable.day} onValueChange={(v) => setNewTimetable({ ...newTimetable, day: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Input placeholder="Time Slot (e.g., 8:00 - 10:00)" value={newTimetable.time_slot} onChange={(e) => setNewTimetable({ ...newTimetable, time_slot: e.target.value })} />
                    <Input placeholder="Course Code" value={newTimetable.course_code} onChange={(e) => setNewTimetable({ ...newTimetable, course_code: e.target.value })} />
                    <Input placeholder="Venue" value={newTimetable.venue} onChange={(e) => setNewTimetable({ ...newTimetable, venue: e.target.value })} />
                    <Input placeholder="Lecturer" value={newTimetable.lecturer} onChange={(e) => setNewTimetable({ ...newTimetable, lecturer: e.target.value })} />
                    <Input placeholder="Department" value={newTimetable.department} onChange={(e) => setNewTimetable({ ...newTimetable, department: e.target.value })} />
                  </div>
                  <Button onClick={() => addItem("admin_timetable", newTimetable, () => setNewTimetable({ day: "Monday", time_slot: "", course_code: "", venue: "", lecturer: "", department: "", semester: "first" }), loadTimetable, "Timetable entry")} disabled={!newTimetable.course_code || !newTimetable.time_slot} size="sm">
                    <Save className="w-4 h-4 mr-1" />Save
                  </Button>
                </motion.div>
              )}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Day</TableHead>
                      <TableHead className="text-xs">Time</TableHead>
                      <TableHead className="text-xs">Course</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Venue</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Lecturer</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Department</TableHead>
                      <TableHead className="text-xs w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timetable.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="text-xs">{editingId === t.id ? <Input value={editData.day || ""} onChange={(e) => setEditData({ ...editData, day: e.target.value })} className="h-8 text-xs" /> : t.day}</TableCell>
                        <TableCell className="text-xs">{editingId === t.id ? <Input value={editData.time_slot || ""} onChange={(e) => setEditData({ ...editData, time_slot: e.target.value })} className="h-8 text-xs" /> : t.time_slot}</TableCell>
                        <TableCell className="text-xs font-mono">{editingId === t.id ? <Input value={editData.course_code || ""} onChange={(e) => setEditData({ ...editData, course_code: e.target.value })} className="h-8 text-xs" /> : t.course_code}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === t.id ? <Input value={editData.venue || ""} onChange={(e) => setEditData({ ...editData, venue: e.target.value })} className="h-8 text-xs" /> : t.venue}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === t.id ? <Input value={editData.lecturer || ""} onChange={(e) => setEditData({ ...editData, lecturer: e.target.value })} className="h-8 text-xs" /> : t.lecturer}</TableCell>
                        <TableCell className="text-xs hidden lg:table-cell">{editingId === t.id ? <Input value={editData.department || ""} onChange={(e) => setEditData({ ...editData, department: e.target.value })} className="h-8 text-xs" /> : t.department}</TableCell>
                        <TableCell><ActionButtons item={t} table="admin_timetable" loadFn={loadTimetable} nameField="course_code" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {timetable.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No timetable entries.</p>}
              </div>
            </div>
          </TabsContent>

          {/* Journals Tab */}
          <TabsContent value="journals">
            <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold">Journals Management</h2>
                  <p className="text-xs text-muted-foreground">View and manage all uploaded journals</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Title</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Volume</TableHead>
                      <TableHead className="text-xs hidden sm:table-cell">Issue</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">Year</TableHead>
                      <TableHead className="text-xs hidden lg:table-cell">Description</TableHead>
                      <TableHead className="text-xs hidden md:table-cell">File</TableHead>
                      <TableHead className="text-xs w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journals.map((j) => (
                      <TableRow key={j.id}>
                        <TableCell className="text-xs">{editingId === j.id ? <Input value={editData.title || ""} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="h-8 text-xs" /> : j.title}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === j.id ? <Input value={editData.volume || ""} onChange={(e) => setEditData({ ...editData, volume: e.target.value })} className="h-8 text-xs" /> : j.volume}</TableCell>
                        <TableCell className="text-xs hidden sm:table-cell">{editingId === j.id ? <Input value={editData.issue || ""} onChange={(e) => setEditData({ ...editData, issue: e.target.value })} className="h-8 text-xs" /> : j.issue}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">{editingId === j.id ? <Input type="number" value={editData.year || ""} onChange={(e) => setEditData({ ...editData, year: parseInt(e.target.value) || null })} className="h-8 text-xs w-20" /> : j.year}</TableCell>
                        <TableCell className="text-xs hidden lg:table-cell max-w-[280px]">{editingId === j.id ? <Textarea value={editData.description || ""} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="text-xs min-h-[70px]" /> : <span className="whitespace-pre-wrap break-words">{j.description || "—"}</span>}</TableCell>
                        <TableCell className="text-xs hidden md:table-cell">
                          {j.file_url ? <a href={j.file_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{j.file_name || "View"}</a> : "—"}
                        </TableCell>
                        <TableCell><ActionButtons item={j} table="journals" loadFn={loadJournals} nameField="title" /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {journals.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No journals uploaded yet.</p>}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{deleteDialog?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
