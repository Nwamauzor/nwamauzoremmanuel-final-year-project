
-- Fix overly permissive RLS policies on chat tables
-- Chat conversations: use session_id based access
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can view own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can update own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can delete own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can manage messages" ON public.chat_messages;

-- For chat_conversations: allow public read/insert via session_id, auth users via user_id
CREATE POLICY "Public can insert conversations" ON public.chat_conversations FOR INSERT WITH CHECK (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Public can select by session" ON public.chat_conversations FOR SELECT USING (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Public can update own conversations" ON public.chat_conversations FOR UPDATE USING (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "Public can delete own conversations" ON public.chat_conversations FOR DELETE USING (user_id IS NULL OR user_id = auth.uid());

-- For chat_messages: access through conversation ownership
CREATE POLICY "Messages accessible via conversation" ON public.chat_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.chat_conversations WHERE id = conversation_id AND (user_id IS NULL OR user_id = auth.uid()))
);
CREATE POLICY "Messages insertable via conversation" ON public.chat_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.chat_conversations WHERE id = conversation_id AND (user_id IS NULL OR user_id = auth.uid()))
);
CREATE POLICY "Messages deletable via conversation" ON public.chat_messages FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.chat_conversations WHERE id = conversation_id AND (user_id IS NULL OR user_id = auth.uid()))
);
