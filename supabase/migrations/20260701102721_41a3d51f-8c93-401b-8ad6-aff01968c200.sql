
-- Roles infra (idempotent, in case not present)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- Work requests
CREATE TABLE public.work_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company_name text NOT NULL,
  role_title text,
  email text NOT NULL,
  website_or_linkedin text,
  help_needed text NOT NULL,
  budget_range text,
  timeline text,
  additional_notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.work_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.work_requests TO authenticated;
GRANT ALL ON public.work_requests TO service_role;

ALTER TABLE public.work_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a work request"
  ON public.work_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view work requests"
  ON public.work_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update work requests"
  ON public.work_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete work requests"
  ON public.work_requests FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
