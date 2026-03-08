import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { motion } from "framer-motion";
import { LogOut, Plus, Trash2, Edit2, Save, X, Shield, Users, BookOpen, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { lovable } from "@/integrations/lovable/index";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { toast } = useToast();

  // Data states
  const [staff, setStaff] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  // New item forms
  const [newStaff, setNewStaff] = useState({ name: "", qualification: "", designation: "", specialization: "", department: "", staff_type: "academic" });
  const [newCourse, setNewCourse] = useState({ code: "", title: "", unit: 2, status: "Compulsory", department: "", level: "100L", semester: "first" });
  const [newTimetable, setNewTimetable] = useState({ day: "Monday", time_slot: "", course_code: "", venue: "", lecturer: "", department: "" });
  const [showNewForm, setShowNewForm] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle()
          .then(({ data }) => setIsAdmin(!!data));
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadStaff();
      loadCourses();
      loadTimetable();
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Welcome back!" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Account created", description: "You can now log in." });
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) toast({ title: "Error", description: String(error), variant: "destructive" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  // CRUD operations
  const addStaff = async () => {
    const { error } = await supabase.from("admin_staff").insert(newStaff);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { loadStaff(); setNewStaff({ name: "", qualification: "", designation: "", specialization: "", department: "", staff_type: "academic" }); setShowNewForm(null); toast({ title: "Staff added" }); }
  };

  const addCourse = async () => {
    const { error } = await supabase.from("admin_courses").insert(newCourse);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { loadCourses(); setNewCourse({ code: "", title: "", unit: 2, status: "Compulsory", department: "", level: "100L", semester: "first" }); setShowNewForm(null); toast({ title: "Course added" }); }
  };

  const addTimetableEntry = async () => {
    const { error } = await supabase.from("admin_timetable").insert(newTimetable);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { loadTimetable(); setNewTimetable({ day: "Monday", time_slot: "", course_code: "", venue: "", lecturer: "", department: "" }); setShowNewForm(null); toast({ title: "Timetable entry added" }); }
  };

  const deleteItem = async (table: string, id: string) => {
    const { error } = await (supabase.from as any)(table).delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      if (table === "admin_staff") loadStaff();
      if (table === "admin_courses") loadCourses();
      if (table === "admin_timetable") loadTimetable();
      toast({ title: "Deleted" });
    }
  };

  const saveEdit = async (table: string) => {
    if (!editingId) return;
    const { error } = await (supabase.from as any)(table).update(editData).eq("id", editingId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      setEditingId(null);
      if (table === "admin_staff") loadStaff();
      if (table === "admin_courses") loadCourses();
      if (table === "admin_timetable") loadTimetable();
      toast({ title: "Updated" });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-md">
            <motion.div className="glass-card p-8 rounded-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
              </div>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ui.edu.ng" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-1" required />
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
              <p className="text-xs text-muted-foreground text-center mt-4">⚠️ Admin access is restricted to authorized faculty members only.</p>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-md text-center">
            <motion.div className="glass-card p-8 rounded-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Shield className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">Access Denied</h1>
              <p className="text-muted-foreground mb-6">You don't have admin privileges. Contact the faculty administrator to request access.</p>
              <Button onClick={handleLogout} variant="outline"><LogOut className="w-4 h-4 mr-2" />Logout</Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-8 sm:py-12 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">Manage faculty content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>

          <Tabs defaultValue="staff" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted mb-6">
              <TabsTrigger value="staff" className="py-2 text-xs sm:text-sm gap-1">
                <Users className="w-4 h-4 hidden sm:inline" />Staff
              </TabsTrigger>
              <TabsTrigger value="courses" className="py-2 text-xs sm:text-sm gap-1">
                <BookOpen className="w-4 h-4 hidden sm:inline" />Courses
              </TabsTrigger>
              <TabsTrigger value="timetable" className="py-2 text-xs sm:text-sm gap-1">
                <Calendar className="w-4 h-4 hidden sm:inline" />Timetable
              </TabsTrigger>
            </TabsList>

            {/* Staff Tab */}
            <TabsContent value="staff">
              <div className="glass-card p-4 sm:p-6 rounded-2xl">
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
                    <Button onClick={addStaff} disabled={!newStaff.name} size="sm"><Save className="w-4 h-4 mr-1" />Save</Button>
                  </motion.div>
                )}

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Name</TableHead>
                        <TableHead className="text-xs hidden md:table-cell">Qualification</TableHead>
                        <TableHead className="text-xs">Designation</TableHead>
                        <TableHead className="text-xs hidden lg:table-cell">Department</TableHead>
                        <TableHead className="text-xs w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staff.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="text-xs sm:text-sm">
                            {editingId === s.id ? (
                              <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="h-8 text-xs" />
                            ) : s.name}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">{s.qualification}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{s.designation}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden lg:table-cell">{s.department}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {editingId === s.id ? (
                                <>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveEdit("admin_staff")}><Save className="w-3 h-3" /></Button>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingId(null)}><X className="w-3 h-3" /></Button>
                                </>
                              ) : (
                                <>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingId(s.id); setEditData(s); }}><Edit2 className="w-3 h-3" /></Button>
                                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteItem("admin_staff", s.id)}><Trash2 className="w-3 h-3" /></Button>
                                </>
                              )}
                            </div>
                          </TableCell>
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
              <div className="glass-card p-4 sm:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold">Course Management</h2>
                  <Button size="sm" onClick={() => setShowNewForm(showNewForm === "courses" ? null : "courses")}>
                    <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Course</span>
                  </Button>
                </div>

                {showNewForm === "courses" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Input placeholder="Course Code" value={newCourse.code} onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })} />
                      <Input placeholder="Course Title" value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} />
                      <Input placeholder="Units" type="number" value={newCourse.unit} onChange={(e) => setNewCourse({ ...newCourse, unit: Number(e.target.value) })} />
                      <Input placeholder="Department" value={newCourse.department} onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })} />
                      <Select value={newCourse.level} onValueChange={(v) => setNewCourse({ ...newCourse, level: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["100L", "200L", "300L", "400L", "500L"].map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Select value={newCourse.semester} onValueChange={(v) => setNewCourse({ ...newCourse, semester: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first">First Semester</SelectItem>
                          <SelectItem value="second">Second Semester</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addCourse} disabled={!newCourse.code || !newCourse.title} size="sm"><Save className="w-4 h-4 mr-1" />Save</Button>
                  </motion.div>
                )}

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Code</TableHead>
                        <TableHead className="text-xs">Title</TableHead>
                        <TableHead className="text-xs hidden sm:table-cell">Units</TableHead>
                        <TableHead className="text-xs hidden md:table-cell">Level</TableHead>
                        <TableHead className="text-xs hidden lg:table-cell">Dept</TableHead>
                        <TableHead className="text-xs w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="text-xs sm:text-sm font-medium">{c.code}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{c.title}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{c.unit}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">{c.level}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden lg:table-cell">{c.department}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingId(c.id); setEditData(c); }}><Edit2 className="w-3 h-3" /></Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteItem("admin_courses", c.id)}><Trash2 className="w-3 h-3" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {courses.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No courses yet. Click "Add Course" to begin.</p>}
                </div>
              </div>
            </TabsContent>

            {/* Timetable Tab */}
            <TabsContent value="timetable">
              <div className="glass-card p-4 sm:p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold">Timetable Management</h2>
                  <Button size="sm" onClick={() => setShowNewForm(showNewForm === "timetable" ? null : "timetable")}>
                    <Plus className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Add Entry</span>
                  </Button>
                </div>

                {showNewForm === "timetable" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border border-border rounded-lg p-4 mb-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <Select value={newTimetable.day} onValueChange={(v) => setNewTimetable({ ...newTimetable, day: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Time (e.g. 8:00 - 10:00)" value={newTimetable.time_slot} onChange={(e) => setNewTimetable({ ...newTimetable, time_slot: e.target.value })} />
                      <Input placeholder="Course Code" value={newTimetable.course_code} onChange={(e) => setNewTimetable({ ...newTimetable, course_code: e.target.value })} />
                      <Input placeholder="Venue" value={newTimetable.venue} onChange={(e) => setNewTimetable({ ...newTimetable, venue: e.target.value })} />
                      <Input placeholder="Lecturer" value={newTimetable.lecturer} onChange={(e) => setNewTimetable({ ...newTimetable, lecturer: e.target.value })} />
                      <Input placeholder="Department" value={newTimetable.department} onChange={(e) => setNewTimetable({ ...newTimetable, department: e.target.value })} />
                    </div>
                    <Button onClick={addTimetableEntry} disabled={!newTimetable.course_code} size="sm"><Save className="w-4 h-4 mr-1" />Save</Button>
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
                        <TableHead className="text-xs w-20">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetable.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="text-xs sm:text-sm">{t.day}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{t.time_slot}</TableCell>
                          <TableCell className="text-xs sm:text-sm font-medium">{t.course_code}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{t.venue}</TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">{t.lecturer}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteItem("admin_timetable", t.id)}><Trash2 className="w-3 h-3" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {timetable.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">No timetable entries. Click "Add Entry" to begin.</p>}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
