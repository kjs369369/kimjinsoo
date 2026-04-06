
-- Drop overly permissive UPDATE policies
DROP POLICY "Anyone can update applications" ON public.applications;
DROP POLICY "Anyone can update admin settings" ON public.admin_settings;

-- Applications: no direct UPDATE from client (admin will use edge function with service role)
-- Chat messages INSERT is intentional for anonymous users

-- Admin settings: no direct UPDATE from client
-- Admin password changes will go through an edge function with service role key
