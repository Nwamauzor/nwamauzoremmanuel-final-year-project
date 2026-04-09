CREATE TABLE public.chat_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic_tags TEXT[] DEFAULT '{}',
  usage_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chat_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view knowledge" ON public.chat_knowledge FOR SELECT USING (true);
CREATE POLICY "Anyone can insert knowledge" ON public.chat_knowledge FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update knowledge" ON public.chat_knowledge FOR UPDATE USING (true);

CREATE INDEX idx_chat_knowledge_question ON public.chat_knowledge USING gin(to_tsvector('english', question));
CREATE INDEX idx_chat_knowledge_tags ON public.chat_knowledge USING gin(topic_tags);