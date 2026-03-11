
-- Fix: All citizen_reports policies are RESTRICTIVE which means no access is granted.
-- Drop all and recreate as PERMISSIVE.

DROP POLICY IF EXISTS "Approved reports are viewable by everyone" ON public.citizen_reports;
DROP POLICY IF EXISTS "Admins can update all reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Authenticated users can create reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users can delete their own reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users can update their own reports" ON public.citizen_reports;

CREATE POLICY "Public view approved reports" ON public.citizen_reports
  FOR SELECT TO authenticated, anon
  USING (status = 'approved');

CREATE POLICY "Users view own reports" ON public.citizen_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all reports" ON public.citizen_reports
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create reports" ON public.citizen_reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update reports" ON public.citizen_reports
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update own reports" ON public.citizen_reports
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports" ON public.citizen_reports
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Add SELECT policy for contact_messages so admins can read them
CREATE POLICY "Admins view contact messages" ON public.contact_messages
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix contact_messages INSERT to be permissive
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(TRIM(BOTH FROM name)) > 0 AND length(TRIM(BOTH FROM email)) > 0 AND length(TRIM(BOTH FROM message)) > 0);
