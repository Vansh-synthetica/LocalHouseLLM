import { type ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import NotFound from "./pages/NotFound";
// Every other page is its own chunk — see src/pages.ts.
import {
  Index,
  About,
  Anvira,
  AnviraNotes,
  Releases,
  Archive,
  PaperReader,
  Stack,
  Docs,
  Faq,
  OrchaLicense,
  AccountProfile,
  AccountReset,
} from "./pages";

const queryClient = new QueryClient();

/** Providers shared by the browser app and the build-time prerenderer. */
export const AppShell = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

const AppRoutes = () => (
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/anvira" element={<Anvira />} />
              <Route path="/anvira-notes" element={<AnviraNotes />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/releases/:product" element={<Releases />} />
              <Route path="/about" element={<About />} />
              <Route path="/stack" element={<Stack />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/archive/:slug" element={<PaperReader />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/orcha/license" element={<OrchaLicense />} />

              {/* Consolidated: Mission/Vision/Contact merged into About */}
              <Route path="/mission" element={<Navigate to="/about" replace />} />
              <Route path="/vision" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<Navigate to="/about" replace />} />
              <Route path="/work-with-us" element={<Navigate to="/about" replace />} />

              {/* Consolidated: the six stack detail pages merged into /stack as anchors */}
              <Route path="/stack/aicl" element={<Navigate to="/stack#aicl" replace />} />
              <Route path="/stack/orcha" element={<Navigate to="/stack#orcha" replace />} />
              <Route path="/stack/memory" element={<Navigate to="/stack#memory" replace />} />
              <Route path="/stack/safety" element={<Navigate to="/stack#safety" replace />} />
              <Route path="/stack/tools" element={<Navigate to="/stack#tools" replace />} />
              <Route path="/stack/modules" element={<Navigate to="/stack#modules" replace />} />

              {/* Hidden for now — pages kept on disk, just unrouted; redirect rather than 404 */}
              <Route path="/nomi" element={<Navigate to="/stack#memory" replace />} />
              <Route path="/products" element={<Navigate to="/anvira" replace />} />
              <Route path="/frameworks" element={<Navigate to="/stack" replace />} />
              <Route path="/start" element={<Navigate to="/docs" replace />} />
              <Route path="/benchmarks" element={<Navigate to="/stack" replace />} />
              <Route path="/use-cases" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/ai-tutors" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/healthcare" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/agriculture" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/research" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/enterprise-private-ai" element={<Navigate to="/" replace />} />
              <Route path="/use-cases/edge-ai" element={<Navigate to="/" replace />} />
              <Route path="/release-logs" element={<Navigate to="/releases" replace />} />
              <Route path="/changelog" element={<Navigate to="/releases" replace />} />
              <Route path="/sitemap" element={<Navigate to="/" replace />} />

              {/* Legacy redirects (pre-existing) */}
              <Route path="/opensource" element={<Navigate to="/archive" replace />} />
              <Route path="/research" element={<Navigate to="/archive" replace />} />

              {/* Accounts are Anvira accounts — the same sign-in as the apps. The website's older sign-in
                  used a Supabase project that no longer exists, so its URLs now lead here. Anvira Notes
                  opens /account/profile from "Manage profile": keep that URL working. */}
              <Route path="/account" element={<Navigate to="/account/profile" replace />} />
              <Route path="/account/profile" element={<AccountProfile />} />
              <Route path="/account/signin" element={<AccountProfile />} />
              <Route path="/account/signup" element={<AccountProfile />} />
              <Route path="/account/reset" element={<AccountReset />} />
              <Route path="/login" element={<Navigate to="/account/signin" replace />} />
              <Route path="/register" element={<Navigate to="/account/signup" replace />} />
              <Route path="/signup" element={<Navigate to="/account/signup" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/account/signin" replace />} />
              <Route path="/reset-password" element={<Navigate to="/account/signin" replace />} />
              <Route path="/verify-email" element={<Navigate to="/account/signin" replace />} />
              <Route path="/dashboard/*" element={<Navigate to="/account/profile" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
);

/**
 * Everything under the router, shared by the browser app and the prerenderer so
 * both trees match. Keep any provider whose state changes on mount (like a sign-in
 * session) inside this Suspense boundary, not above it: an update reaching a
 * boundary that is still hydrating makes React throw away the prerendered HTML and
 * re-render the page (React error #421). Accounts use the Anvira session
 * (src/integrations/anvira), read where needed.
 */
export const AppBody = () => (
  <Suspense fallback={null}>
    <AppRoutes />
  </Suspense>
);

const App = () => (
  <HelmetProvider>
    <AppShell>
      {/* startTransition keeps the current page on screen while the next page's chunk loads. */}
      <BrowserRouter future={{ v7_startTransition: true }}>
        <AppBody />
      </BrowserRouter>
    </AppShell>
  </HelmetProvider>
);

export default App;
