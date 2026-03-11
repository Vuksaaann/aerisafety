
-- Add FK from citizen_reports.user_id to profiles.user_id for PostgREST joins
ALTER TABLE public.citizen_reports 
  ADD CONSTRAINT citizen_reports_profile_fkey 
  FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);
