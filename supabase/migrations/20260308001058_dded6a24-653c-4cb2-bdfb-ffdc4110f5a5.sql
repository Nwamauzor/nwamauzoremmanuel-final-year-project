
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  given_name TEXT,
  family_name TEXT,
  affiliation TEXT,
  country TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, given_name, family_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'given_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'family_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- User roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Chat conversations
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'New Chat',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create conversations" ON public.chat_conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view own conversations" ON public.chat_conversations FOR SELECT USING (session_id = session_id);
CREATE POLICY "Authenticated users view own" ON public.chat_conversations FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Anyone can update own conversations" ON public.chat_conversations FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete own conversations" ON public.chat_conversations FOR DELETE USING (true);

-- Chat messages
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage messages" ON public.chat_messages FOR ALL USING (true);

-- Journals table for file uploads
CREATE TABLE public.journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_name TEXT,
  file_type TEXT,
  volume TEXT,
  issue TEXT,
  year INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view journals" ON public.journals FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON public.journals FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journals" ON public.journals FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journals" ON public.journals FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Admin content tables
CREATE TABLE public.admin_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  qualification TEXT,
  designation TEXT,
  specialization TEXT,
  department TEXT,
  staff_type TEXT NOT NULL DEFAULT 'academic' CHECK (staff_type IN ('academic', 'technical', 'administrative')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view staff" ON public.admin_staff FOR SELECT USING (true);
CREATE POLICY "Admins can manage staff" ON public.admin_staff FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.admin_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  unit INTEGER NOT NULL DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'Compulsory' CHECK (status IN ('Compulsory', 'Required', 'Elective')),
  department TEXT NOT NULL,
  level TEXT NOT NULL,
  semester TEXT NOT NULL CHECK (semester IN ('first', 'second')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view courses" ON public.admin_courses FOR SELECT USING (true);
CREATE POLICY "Admins can manage courses" ON public.admin_courses FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.admin_timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  course_code TEXT NOT NULL,
  venue TEXT NOT NULL,
  lecturer TEXT NOT NULL,
  department TEXT,
  semester TEXT DEFAULT 'first',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_timetable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view timetable" ON public.admin_timetable FOR SELECT USING (true);
CREATE POLICY "Admins can manage timetable" ON public.admin_timetable FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for journal uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('journals', 'journals', true);

CREATE POLICY "Authenticated users can upload journals" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'journals');
CREATE POLICY "Anyone can view journal files" ON storage.objects FOR SELECT USING (bucket_id = 'journals');
CREATE POLICY "Users can delete own journal files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'journals');
