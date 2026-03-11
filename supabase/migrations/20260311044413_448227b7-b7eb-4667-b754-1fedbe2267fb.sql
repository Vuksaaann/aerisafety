
-- Fix all RESTRICTIVE policies to PERMISSIVE

-- citizen_reports
DROP POLICY IF EXISTS "Public view approved reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users view own reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Admins view all reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users can create reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Admins can update reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users can update own reports" ON public.citizen_reports;
DROP POLICY IF EXISTS "Users can delete own reports" ON public.citizen_reports;

CREATE POLICY "Public view approved reports" ON public.citizen_reports
  AS PERMISSIVE FOR SELECT TO anon, authenticated
  USING (status = 'approved');
CREATE POLICY "Users view own reports" ON public.citizen_reports
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Admins view all reports" ON public.citizen_reports
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can create reports" ON public.citizen_reports
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update reports" ON public.citizen_reports
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can update own reports" ON public.citizen_reports
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reports" ON public.citizen_reports
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- contact_messages
DROP POLICY IF EXISTS "Admins view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
CREATE POLICY "Admins view contact messages" ON public.contact_messages
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
  AS PERMISSIVE FOR INSERT TO anon, authenticated
  WITH CHECK (length(TRIM(BOTH FROM name)) > 0 AND length(TRIM(BOTH FROM email)) > 0 AND length(TRIM(BOTH FROM message)) > 0);

-- user_roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view own roles" ON public.user_roles
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  AS PERMISSIVE FOR SELECT TO public USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  AS PERMISSIVE FOR INSERT TO public WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  AS PERMISSIVE FOR UPDATE TO public USING (auth.uid() = user_id);

-- Add unique constraint on profiles.user_id if not exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_user_id_unique') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
  END IF;
END $$;
