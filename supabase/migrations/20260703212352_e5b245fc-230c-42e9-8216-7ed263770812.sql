
-- 1) user_roles: add least-privilege policies (admins manage; users read own)
CREATE POLICY "Admins can view all user roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert user roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update user roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete user roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2) has_role: revoke public execution; keep for authenticated (RLS needs it) and service_role
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- 3) work_requests: replace WITH CHECK (true) with real field validation
DROP POLICY IF EXISTS "Anyone can submit a work request" ON public.work_requests;

CREATE POLICY "Anyone can submit a validated work request"
  ON public.work_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(btrim(full_name))    BETWEEN 1 AND 120
    AND length(btrim(company_name)) BETWEEN 1 AND 160
    AND length(btrim(email))        BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(help_needed))  BETWEEN 1 AND 4000
    AND coalesce(length(role_title), 0)         <= 160
    AND coalesce(length(website_or_linkedin), 0) <= 400
    AND coalesce(length(budget_range), 0)        <= 120
    AND coalesce(length(timeline), 0)            <= 120
    AND coalesce(length(additional_notes), 0)    <= 4000
    AND status = 'new'
  );
